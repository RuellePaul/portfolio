import * as THREE from 'three';
import {PCFSoftShadowMap, PerspectiveCamera, ReinhardToneMapping, Vector3, WebGLRenderer} from 'three';
import OpeningScene from 'src/components/Universe/scenes/OpeningScene';

class Engine {
    public renderer: WebGLRenderer;
    public camera: PerspectiveCamera;
    public scene: OpeningScene;
    private attached: Boolean = false;

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

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera = camera;

        window.addEventListener('resize', this.resize);

        this.scene = new OpeningScene();

        // Scroll Animation
        function moveCamera() {
            const scroller = document.querySelector('section[data-scrollbar="true"] > :first-child');
            if (!scroller) {
                return;
            }
            const t = Math.abs(scroller.getBoundingClientRect().top);
            const height = scroller.clientHeight - window.innerHeight;

            const targetPosition = new Vector3(0, 0, -100);

            camera.position.x = (t / height) * targetPosition.x;
            camera.position.y = (t / height) * targetPosition.y;
            camera.position.z = (t / height) * targetPosition.z;
        }

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            this.scene.update();
            moveCamera();
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
