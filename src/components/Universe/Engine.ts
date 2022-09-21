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
        this.renderer.toneMappingExposure = Math.pow(2, 4);
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.shadowMap.enabled = true;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', this.resize);

        this.scene = new OpeningScene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera = camera;
        function moveCamera() {
            const scrollY = Math.abs(document.body.getBoundingClientRect().top);
            const height = document.body.clientHeight - window.innerHeight;

            const targetPosition = new Vector3(0, 0, -100);

            camera.position.x = (scrollY / height) * targetPosition.x;
            camera.position.y = (scrollY / height) * targetPosition.y;
            camera.position.z = (scrollY / height) * targetPosition.z;
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
