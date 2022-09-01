import {memo, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import * as THREE from 'three';
import {randInt} from 'three/src/math/MathUtils';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import Engine from 'src/components/Universe/Engine';

const CanvasContainer = styled.div`
    canvas {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
`;

function Universe() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) {
            // Setup
            const engine = new Engine();
            engine.attach(container.current);

            // Lights
            const light = new THREE.AmbientLight(0xffffff);
            engine.scene.add(light);

            // Stars
            function addStar(maxSize: number) {
                const geometry = new THREE.SphereGeometry(randInt(1, maxSize));
                const material = new THREE.MeshStandardMaterial({color: 0xffffff});
                const star = new THREE.Mesh(geometry, material);

                const [x, y, z] = new Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(2000));
                star.position.set(x, y, z);
                engine.scene.add(star);
            }

            Array(1000)
                .fill(0)
                .forEach(() => addStar(1));
            Array(100)
                .fill(0)
                .forEach(() => addStar(10));

            // Scroll Animation
            function moveCamera() {
                const t = Math.abs(document.body.getBoundingClientRect().top);
                const height = document.body.clientHeight - window.innerHeight;

                const target = {position: {x: 0, y: 0, z: -100}, rotation: {x: 0, y: 0, z: 0}};

                engine.camera.position.x = (t / height) * target.position.x;
                engine.camera.position.y = (t / height) * target.position.y;
                engine.camera.position.z = (t / height) * target.position.z;
                engine.camera.rotation.x = (t / height) * target.rotation.x;
                engine.camera.rotation.y = (t / height) * target.position.y;
                engine.camera.rotation.z = (t / height) * target.rotation.z;
            }

            document.body.onscroll = moveCamera;

            // Asteroids
            let ring1;
            const loader = new GLTFLoader();

            loader.load('src/models/asteroids3.gltf', function (gltf) {
                ring1 = gltf.scene.children[0];

                engine.scene.add(gltf.scene);
            });
        }
    }, []);

    return <CanvasContainer ref={container} />;
}

export default memo(Universe);
