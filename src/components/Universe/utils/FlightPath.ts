import {Vector3} from 'three';
import {interpolate, relativeProgress} from 'src/components/Universe/utils/math';

interface XYZ {
    x: number;
    y: number;
    z: number;
}

type Value = Partial<XYZ> | number;

interface Path {
    type: 'position' | 'rotation' | 'fov';
    value: Value;
    start: number;
    end: number;
    easing?: any;
}

class FlightPath {
    positionX = [];
    positionY = [];
    positionZ = [];

    offsetX = [];
    offsetY = [];
    offsetZ = [];

    rotationX = [];
    rotationY = [];
    rotationZ = [];

    fovTimeline = [];

    arrays = [
        {
            type: 'positionX',
            data: this.positionX
        },
        {
            type: 'positionY',
            data: this.positionY
        },
        {
            type: 'positionZ',
            data: this.positionZ
        },
        {
            type: 'offsetX',
            data: this.offsetX
        },
        {
            type: 'offsetY',
            data: this.offsetY
        },
        {
            type: 'offsetZ',
            data: this.offsetZ
        },
        {
            type: 'rotationX',
            data: this.rotationX
        },
        {
            type: 'rotationY',
            data: this.rotationY
        },
        {
            type: 'rotationZ',
            data: this.rotationZ
        },
        {
            type: 'fov',
            data: this.fovTimeline
        }
    ];

    private progress: number;
    private cameraObject: any;
    private initialPosition: Vector3;
    private initialRotation: Vector3;
    private initialOffset: Vector3;
    private initialFOV: number;
    private currentOffset: Vector3;
    private currentPosition: Vector3;
    private currentRotation: Vector3;
    private currentFov: number;

    constructor(cameraObject: any) {
        this.cameraObject = cameraObject;

        this.initialPosition = new Vector3().copy(cameraObject.getPosition());
        this.initialRotation = new Vector3().copy(cameraObject.getRotation());
        this.initialOffset = new Vector3().copy(cameraObject.getOffset());
        this.initialFOV = cameraObject.getFov();

        this.currentPosition = new Vector3().copy(cameraObject.getPosition());
        this.currentOffset = new Vector3().copy(cameraObject.getOffset());
        this.currentRotation = new Vector3().copy(cameraObject.getRotation());

        this.currentFov = this.initialFOV;
    }

    add({type, value, start, end, easing}: Path) {
        const dataObj = (value: Partial<XYZ>) => {
            return {
                start,
                end,
                value,
                easing: easing || ((x: any) => x)
            };
        };

        let array: Partial<Path>[] = [];

        if (type === 'position') {
            for (let prop in value as Partial<XYZ>) {
                if (prop === 'x') array = this.positionX;
                if (prop === 'y') array = this.positionY;
                if (prop === 'z') array = this.positionZ;

                array.push(dataObj(value[prop]));
            }
        } else if (type === 'offset') {
            for (let prop in value as Partial<XYZ>) {
                if (prop === 'x') array = this.offsetX;
                if (prop === 'y') array = this.offsetY;
                if (prop === 'z') array = this.offsetZ;

                array.push(dataObj(value[prop]));
            }
        } else if (type === 'rotation') {
            for (let prop in value as Partial<XYZ>) {
                if (prop === 'x') array = this.rotationX;
                if (prop === 'y') array = this.rotationY;
                if (prop === 'z') array = this.rotationZ;

                array.push(dataObj(value[prop]));
            }
        } else if (type === 'fov') {
            this.fovTimeline.push(dataObj(value));
        }
    }

    finished = () => {
        this.arrays.forEach((item) => {
            const {data: array, type} = item;

            let initial;

            switch (type) {
                case 'positionX':
                    initial = this.initialPosition.x;
                    break;
                case 'positionY':
                    initial = this.initialPosition.y;
                    break;
                case 'positionZ':
                    initial = this.initialPosition.z;
                    break;
                case 'offsetX':
                    initial = this.initialOffset.x;
                    break;
                case 'offsetY':
                    initial = this.initialOffset.y;
                    break;
                case 'offsetZ':
                    initial = this.initialOffset.z;
                    break;
                case 'rotationX':
                    initial = this.initialRotation.x;
                    break;
                case 'rotationY':
                    initial = this.initialRotation.y;
                    break;
                case 'rotationZ':
                    initial = this.initialRotation.z;
                    break;
                case 'fov':
                    initial = this.initialFOV;
                    break;
                default:
                    break;
            }

            this.compile(array, initial);
        });
    };

    compile = (array, initial) => {
        array.sort(function (a, b) {
            if (a.start < b.start) {
                return -1;
            }
            if (a.start > b.start) {
                return 1;
            }
            return 0;
        });

        array.forEach((item, i) => {
            item.initVal = i > 0 ? array[i - 1].value : initial;
        });

        this.fillGaps(array);
    };

    fillGaps(array) {
        const {length} = array;
        const temp = [];

        for (let i = 0; i < length; i++) {
            const {start, end, initVal, value} = array[i];

            if (i === 0 && start > 0) {
                temp.push({
                    start: 0,
                    end: start,
                    value: initVal,
                    initVal,
                    easing: function (p) {
                        return p;
                    }
                });

                temp.push(array[i]);

                if (length === 1) {
                    temp.push({
                        start: end,
                        end: 1,
                        value,
                        initVal: value,
                        easing: (x: any) => x
                    });
                }
            } else if (i === length - 1 && end < 1) {
                temp.push(array[i]);
                temp.push({
                    start: array[i].end,
                    end: 1,
                    value,
                    initVal: value,
                    easing: function (p) {
                        return p;
                    }
                });
            } else if (length > 1 && i !== length - 1) {
                const {start: start2} = array[i + 1];

                temp.push(array[i]);

                if (end < start2) {
                    temp.push({
                        start: end,
                        end: start2,
                        value,
                        initVal: value,
                        easing: (x: any) => x
                    });
                }
            } else temp.push(array[i]);
        }

        array.forEach((item) => {
            array.pop();
        });

        temp.forEach((item) => {
            array.push(item);
        });
    }

    arrayLoop = (array) => {
        const {type, data} = array;
        const {length} = data;
        const {progress} = this;

        for (let i = 0; i < length; i++) {
            const {easing, start, end, initVal, value} = data[i];

            if (progress > end || progress < start) continue;

            const p = relativeProgress(progress, start, end);
            const ease = easing(p);
            const output = interpolate(initVal, value, ease);

            if (type === 'positionX') this.currentPosition.x = output;
            if (type === 'positionY') this.currentPosition.y = output;
            if (type === 'positionZ') this.currentPosition.z = output;

            if (type === 'offsetX') this.currentOffset.x = output;
            if (type === 'offsetY') this.currentOffset.y = output;
            if (type === 'offsetZ') this.currentOffset.z = output;

            if (type === 'rotationX') this.currentRotation.x = output;
            if (type === 'rotationY') this.currentRotation.y = output;
            if (type === 'rotationZ') this.currentRotation.z = output;

            if (type === 'fov') this.currentFov = output;
        }
    };

    update(progress: number) {
        this.progress = progress;
        this.arrays.forEach(this.arrayLoop);

        this.setValues();
    }

    setValues() {
        this.setPosition();
        this.setRotation();
        this.setOffset();

        this.cameraObject.setFov(this.currentFov);
    }

    setPosition() {
        const {x, y, z} = this.currentPosition;
        this.cameraObject.setPosition({x, y, z});
    }

    setRotation() {
        const {x, y, z} = this.currentRotation;
        this.cameraObject.setRotation({x, y, z});
    }

    setOffset() {
        const {x, y, z} = this.currentOffset;
        this.cameraObject.setOffset({x, y, z});
    }
}

export default FlightPath;
