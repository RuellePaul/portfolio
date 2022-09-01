import * as THREE from 'three';
import {Scene} from 'three';
import {randInt} from 'three/src/math/MathUtils';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

class OpeningScene extends Scene {
    private model: GLTF;

    constructor() {
        super();

        // Lights
        const light = new THREE.AmbientLight(0xffffff);
        this.add(light);

        Array(1000)
            .fill(0)
            .forEach(() => this.addStar(1));
        Array(100)
            .fill(0)
            .forEach(() => this.addStar(10));

        // Asteroids
        const loader = new GLTFLoader();
        loader.load('src/models/asteroids3.gltf', (model) => {
            this.model = model;
            this.add(model.scene);
        });
    }

    addStar = (maxSize: number) => {
        const geometry = new THREE.SphereGeometry(randInt(1, maxSize));
        const material = new THREE.MeshStandardMaterial({color: 0xffffff});
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = new Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(2000));
        star.position.set(x, y, z);
        this.add(star);
    };

    update = () => {
        if (this.model) {
            const ring1 = this.model.scene.children[0];
            const ring2 = this.model.scene.children[1];

            const t = window.performance.now() * 0.0005;

            this.model.scene.rotation.x = -t * 0.3;
            this.model.scene.rotation.z = -t * 0.3;

            ring1.rotation.x = -t * 0.3;
            ring2.rotation.y = -t * 0.3;

            ring1.children.forEach((child, i) => {
                if (i % 2 === 0) return;
                child.rotation.x = t * Math.sin(i);
                child.rotation.y = t * Math.cos(i);
            });

            ring2.children.forEach((child, i) => {
                if (i % 2 === 0) return;
                child.rotation.x = t * Math.sin(i);
                child.rotation.y = t * Math.cos(i);
            });
        }
    };
}

export default OpeningScene;
