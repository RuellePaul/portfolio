import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import OpeningScene from 'src/components/Universe/scenes/OpeningScene';

class Engine {
    public renderer: WebGLRenderer;
    public camera: PerspectiveCamera;
    public scene: OpeningScene;
    private attached: Boolean = false;

    constructor() {
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.scene = new OpeningScene();

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            this.scene.update();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    attach = (parent: HTMLDivElement) => {
        if (!this.attached) {
            parent.appendChild(this.renderer.domElement);
            this.attached = true;
        }
    };
}

export default Engine;
