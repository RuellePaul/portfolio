import {PCFSoftShadowMap, PerspectiveCamera, ReinhardToneMapping, WebGLRenderer} from 'three';
import Scene from 'src/components/Universe/Scene';
import FlightPath from 'src/components/Universe/utils/FlightPath';
import {easing} from 'src/components/Universe/utils/math';
import MainCamera from 'src/components/Universe/utils/MainCamera';

class Engine {
    public renderer: WebGLRenderer;
    public camera: PerspectiveCamera;
    public scene: Scene;
    private attached: Boolean = false;
    private flightPath: FlightPath;
    private cameraObject: any;

    constructor() {
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.toneMapping = ReinhardToneMapping;
        this.renderer.toneMappingExposure = Math.pow(2, 4);
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.shadowMap.enabled = true;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', this.resize);

        this.scene = new Scene();

        this.cameraObject = MainCamera();
        this.camera = this.cameraObject.camera;

        this.cameraObject.setPosition({z: 0.3, y: 0.52, x: 0});
        this.cameraObject.setRotation({x: Math.PI / 20, y: 0, z: 0});
        this.scene.add(this.cameraObject);

        this.flightPath = new FlightPath(this.cameraObject);

        this.flightPath.add({
            type: 'position',
            value: {x: 100, z: 100},
            start: 0,
            end: 0.4,
            easing: easing.inSine
        });

        this.flightPath.add({
            type: 'rotation',
            value: {y: Math.PI / 2},
            start: 0,
            end: 0.4,
            easing: easing.inSine
        });

        this.flightPath.add({
            type: 'fov',
            value: 120,
            start: 0.75,
            end: 1,
            easing: easing.inSine
        });
        this.flightPath.add({
            type: 'position',
            value: {x: -150},
            start: 0.75,
            end: 1,
            easing: easing.inSine
        });

        this.flightPath.finished();

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            this.scene.update();
            const scrollY = document.body.getBoundingClientRect().top;
            const height = document.querySelector('main')!.clientHeight - window.innerHeight;
            const progress = Math.abs(scrollY / height);
            this.flightPath.update(progress);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    resize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    attach = (parent: HTMLDivElement) => {
        if (!this.attached) {
            parent.appendChild(this.renderer.domElement);
            this.attached = true;
        }
    };
}

export default Engine;
