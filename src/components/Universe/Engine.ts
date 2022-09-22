import {PCFSoftShadowMap, PerspectiveCamera, ReinhardToneMapping, WebGLRenderer} from 'three';
import Scene from 'src/components/Universe/Scene';
import FlightPath from 'src/components/Universe/utils/FlightPath';
import MainCamera from 'src/components/Universe/utils/MainCamera';
import {Section} from 'src/store/Sections';
import {easing} from 'src/components/Universe/utils/math';

const DEFAULT_EASING = easing.inOutSine;

const computeProgress = (scrollY: number, sections: Section[]) => {
    const cumulativeSum = (
        (sum) => (value: number) =>
            (sum += value)
    )(0);

    const cumulativeHeights = sections.map((section) => section.height).map(cumulativeSum);
    const currentSectionIndex = cumulativeHeights.indexOf(cumulativeHeights.find((value) => value > scrollY) || 0);
    const currentSection = sections[currentSectionIndex];

    return (
        currentSectionIndex +
        Math.abs(
            (scrollY -
                sections
                    .map((section, index) => (index < currentSectionIndex ? section.height : 0))
                    .reduce((acc, val) => acc + val, 0)) /
                (currentSection.height - (currentSectionIndex === sections.length - 1 ? window.innerHeight : 0))
        )
    );
};

class Engine {
    public renderer: WebGLRenderer;
    public camera: PerspectiveCamera;
    public scene: Scene;
    private attached: Boolean = false;
    private flightPath: FlightPath;
    private cameraObject: any;

    constructor(sections: Section[]) {
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
        this.scene.add(this.cameraObject);

        this.flightPath = new FlightPath(this.cameraObject);

        for (const [index, section] of sections.entries()) {
            for (const path of section.paths) {
                this.flightPath.add({
                    ...path,
                    start: index + path.start,
                    end: index + path.end,
                    easing: DEFAULT_EASING
                });
            }
        }
        this.flightPath.finished();

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            this.scene.update();
            const scroller = document.querySelector('section[data-scrollbar="true"] > :first-child');
            if (!scroller) return;
            const scrollY = Math.abs(scroller.getBoundingClientRect().top);
            const progress = computeProgress(scrollY, sections);
            this.flightPath.update(progress - 1e-12);
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
