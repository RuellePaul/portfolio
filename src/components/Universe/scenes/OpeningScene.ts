import * as THREE from 'three';
import {AmbientLight, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {randInt} from 'three/src/math/MathUtils';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';

import mainCamera, {MainCamera} from 'src/components/Universe/mainCamera';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {Progress} from 'src/types';

class OpeningScene {
    public range = {
        start: 0,
        end: 1,
        section: 0
    };

    renderer: WebGLRenderer;
    cameraObject: MainCamera;
    camera: PerspectiveCamera;
    scene: Scene;
    model: GLTF;
    private simpleComposer: EffectComposer;

    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer;
        this.cameraObject = mainCamera();
        this.camera = this.cameraObject.camera;
        this.scene = new Scene();

        this.scene.add(new AmbientLight(0xffffff, 10));
        this.scene.add(this.cameraObject);

        this.setupRender();

        this.loadModels(this.initScene);
    }

    setupRender = () => {
        const sceneRender = new RenderPass(this.scene, this.camera);

        this.simpleComposer = new EffectComposer(this.renderer);
        this.simpleComposer.addPass(sceneRender);
    };

    initScene = () => {
        Array(1000)
            .fill(0)
            .forEach(() => this.addStar(1));
        Array(100)
            .fill(0)
            .forEach(() => this.addStar(10));
    };

    loadModels = (callback: () => void) => {
        // Asteroids
        const loader = new GLTFLoader();
        loader.load('src/models/asteroids3.gltf', (model) => {
            this.model = model;
            this.scene.add(model.scene);
        });

        // Text
        const fontLoader = new FontLoader();

        fontLoader.load('src/assets/fonts/helvetiker_regular.typeface.json', (font) => {
            const geometry = new TextGeometry('Paul Ruelle', {
                font: font,
                size: 10,
                height: 2
            });

            const material = new THREE.MeshStandardMaterial({color: 0xffffff});
            const text = new THREE.Mesh(geometry, material);
            text.position.z = -150;
            this.scene.add(text);
        });

        callback();
    };

    addStar = (maxSize: number) => {
        const geometry = new THREE.SphereGeometry(randInt(1, maxSize));
        const material = new THREE.MeshStandardMaterial({color: 0xffffff});
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = new Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(2000));
        star.position.set(x, y, z);
        this.scene.add(star);
    };

    update = (progress: number) => {
        console.log('Scene progress', progress);
        if (this.model) {
            const ring1 = this.model.scene.children[0];
            const ring2 = this.model.scene.children[1];

            const t = window.performance.now() * 0.0005;

            this.model.scene.rotation.x = -t * 0.2;
            this.model.scene.rotation.z = -t * 0.2;

            ring1.rotation.x = -t * 0.4;
            ring2.rotation.y = -t * 0.6;

            ring1.children.forEach((child, i) => {
                child.rotation.x = t * Math.sin(i);
                child.rotation.y = t * Math.cos(i);
            });

            ring2.children.forEach((child, i) => {
                child.rotation.x = t * Math.sin(i);
                child.rotation.y = t * Math.cos(i);
            });
        }
    };
}

export default OpeningScene;
