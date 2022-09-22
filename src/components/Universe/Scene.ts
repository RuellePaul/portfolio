import * as THREE from 'three';
import {Scene as ThreeScene} from 'three';
import {randInt} from 'three/src/math/MathUtils';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import TextLoader from 'src/components/Universe/utils/TextLoader';
import titleImage from 'src/assets/images/test.png';

class Scene extends ThreeScene {
    private model: GLTF;

    constructor() {
        super();

        // Lights
        const light = new THREE.AmbientLight(0xffffff);
        this.add(light);

        Array(3000)
            .fill(0)
            .forEach(() => this.addStar(1));
        Array(100)
            .fill(0)
            .forEach(() => this.addStar(10));

        // Asteroids
        const loader = new GLTFLoader();
        loader.load('src/models/asteroids3.gltf', (model) => {
            this.model = model;
            this.model.scene.position.x = 60;
            this.model.scene.position.z = 120;
            this.add(model.scene);
        });

        // Title
        this.createTitle();
    }

    createTitle = () => {
        const titleText = new TextLoader(titleImage);

        titleText.ratio = 2746 / 1000;
        titleText.setHeight(18);
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

    update = () => {
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

export default Scene;
