import {Object3D, PCFSoftShadowMap, PerspectiveCamera, ReinhardToneMapping, WebGLRenderer} from 'three';
import SceneManager from 'src/components/Universe/SceneManager';
import {Progress, Section} from 'src/types';
import {relativeProgress} from 'src/components/Universe/math';
import mainCamera, {MainCamera} from 'src/components/Universe/mainCamera';

const SECTIONS: Section[] = [
    {
        start: 0,
        end: 1000
    },
    {
        start: 1000,
        end: 3000
    },
    {
        start: 3000,
        end: 6000
    }
];

const within = (number: number, min: number, max: number) => {
    return number >= min && number <= max;
};

class Engine {
    public renderer: WebGLRenderer;
    private attached: Boolean = false;
    private sceneManager: SceneManager;
    private progress: Progress;
    private scrollY: number = 0;
    cameraObject: MainCamera;
    camera: PerspectiveCamera;

    constructor() {
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.toneMapping = ReinhardToneMapping;
        this.renderer.toneMappingExposure = Math.pow(1.5, 4.0);
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.shadowMap.enabled = true;

        // 💡 Turn lights on/off
        // this.renderer.setClearColor(0x000000);

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.sceneManager = new SceneManager(this.renderer);

        this.cameraObject = mainCamera();
        this.camera = this.cameraObject.camera;

        window.addEventListener('resize', this.resize);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (!this.progress) return;
            this.sceneManager.update(this.progress);
        };
        animate();
    }

    resize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.sceneManager.resize();
    };

    attach = (parent: HTMLDivElement) => {
        if (!this.attached) {
            parent.appendChild(this.renderer.domElement);
            this.attached = true;
        }
    };

    read = () => {
        this.scrollY += (window.scrollY - this.scrollY) * 0.1;

        const overallProgress = this.scrollY / (document.body.getBoundingClientRect().height - window.innerHeight);

        let currentSection = -1;
        SECTIONS.forEach((section, index) => {
            const {start, end} = section;
            if (within(this.scrollY, start, end)) currentSection = index;
        });

        let sectionProgress = 0;
        let start = 0;
        let end = 0;
        if (currentSection >= 0) {
            const {start: sectionStart, end: sectionEnd} = SECTIONS[currentSection];
            start = sectionStart;
            end = sectionEnd;
            sectionProgress = relativeProgress(this.scrollY, sectionStart, sectionEnd);
        }

        this.progress = {
            sectionProgress,
            overallProgress,
            currentSection,
            start,
            end,
            scrollY: this.scrollY
        };
    };
}

export default Engine;
