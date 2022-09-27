import * as THREE from 'three';
import {Scene as ThreeScene} from 'three';
import {randInt} from 'three/src/math/MathUtils';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import TextLoader from 'src/components/Universe/utils/TextLoader';
import IntroLandscape from 'src/components/Universe/utils/IntroLandscape';
import {relativeProgress} from 'src/components/Universe/utils/math';

class Scene extends ThreeScene {
    model: GLTF;
    landscape: IntroLandscape;

    constructor() {
        super();

        // Lights
        const light = new THREE.AmbientLight(0xffffff);
        light.color.setHex(0xf3f6f9);

        this.add(light);

        Array(1000)
            .fill(0)
            .forEach(() => this.addStar(Math.random() * 2));

        // Asteroids
        const loader = new GLTFLoader();
        loader.load('/static/models/asteroids3.gltf', (model) => {
            this.model = model;
            this.model.scene.position.x = 10;
            this.model.scene.position.y = 10;
            this.model.scene.position.z = -3;
            this.model.scene.scale.x = 0.25;
            this.model.scene.scale.y = 0.25;
            this.model.scene.scale.z = 0.25;
            this.add(model.scene);
        });

        // Title
        this.createTitle();

        // Landscape
        this.landscape = new IntroLandscape();
        this.add(this.landscape);
    }

    createTitle = () => {
        const titleText = new TextLoader('/static/images/text-paulruelle.png');

        titleText.ratio = 1265 / 198;
        titleText.setHeight(10);
        titleText.position.y = 20;
        titleText.position.z = -100;

        this.add(titleText);
    };

    addStar = (maxSize: number) => {
        const geometry = new THREE.SphereGeometry(randInt(1, maxSize));
        const material = new THREE.MeshStandardMaterial({color: 0xffffff});
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = new Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(3000));
        star.position.set(x, y, z);
        this.add(star);
    };

    update = (progress: number) => {
        if (this.model) {
            const ring1 = this.model.scene.children[0];
            const ring2 = this.model.scene.children[1];

            const t = window.performance.now() * 0.0005;

            this.model.scene.rotation.x = -t * 0.1;
            this.model.scene.rotation.z = -t * 0.1;

            ring1.rotation.x = -t * 0.2;
            ring2.rotation.y = -t * 0.2;

            ring1.children.forEach((child, i) => {
                child.rotation.x = t * Math.sin(i);
                child.rotation.y = t * Math.cos(i);
            });

            ring2.children.forEach((child, i) => {
                child.rotation.x = t * Math.sin(i);
                child.rotation.y = t * Math.cos(i);
            });
        }

        this.landscape.update(relativeProgress(progress, 0.25, 0.75));
    };
}

export default Scene;
