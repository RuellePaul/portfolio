import {memo, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import * as THREE from 'three';
import {randInt} from 'three/src/math/MathUtils';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

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
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvas.current) {
            // Setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

            const renderer = new THREE.WebGLRenderer({
                canvas: canvas.current,
                antialias: true
            });

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);

            // Lights
            const light = new THREE.AmbientLight(0xffffff);
            scene.add(light);

            // Stars
            function addStar(maxSize: number) {
                const geometry = new THREE.SphereGeometry(randInt(1, maxSize));
                const material = new THREE.MeshStandardMaterial({color: 0xffffff});
                const star = new THREE.Mesh(geometry, material);

                const [x, y, z] = new Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(2000));
                star.position.set(x, y, z);
                scene.add(star);
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

                camera.position.x = (t / height) * target.position.x;
                camera.position.y = (t / height) * target.position.y;
                camera.position.z = (t / height) * target.position.z;
                camera.rotation.x = (t / height) * target.rotation.x;
                camera.rotation.y = (t / height) * target.position.y;
                camera.rotation.z = (t / height) * target.rotation.z;
            }

            document.body.onscroll = moveCamera;

            // Asteroids

            const loader = new GLTFLoader();

            loader.load(
                // resource URL
                'src/models/asteroids3.gltf',
                // called when the resource is loaded
                function (gltf) {
                    scene.add(gltf.scene);

                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object
                },
                // called while loading is progressing
                function (xhr) {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    console.log('An error happened');
                }
            );
            window.addEventListener('resize', onWindowResize, false);

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            // Animation Loop
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }

            animate();
        }
    }, []);

    return (
        <CanvasContainer>
            <canvas ref={canvas} />
        </CanvasContainer>
    );
}

export default memo(Universe);
