import {memo, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import * as THREE from 'three';
import {randInt} from 'three/src/math/MathUtils';

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
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

            const renderer = new THREE.WebGLRenderer({
                canvas: canvas.current,
                antialias: true
            });

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);

            // Lights
            const pointLight = new THREE.PointLight(0xffffff);
            scene.add(pointLight);

            // Stars
            function addStar() {
                const geometry = new THREE.SphereGeometry(randInt(1, 5));
                const material = new THREE.MeshStandardMaterial({color: 0xffffff});
                const star = new THREE.Mesh(geometry, material);

                const [x, y, z] = Array(3)
                    .fill(0)
                    .map(() => THREE.MathUtils.randFloatSpread(2000));

                star.position.set(x, y, z);
                scene.add(star);
            }

            Array(500).fill(0).forEach(addStar);

            // Scroll Animation
            function moveCamera() {
                const t = Math.abs(document.body.getBoundingClientRect().top);
                const height = document.body.clientHeight - window.innerHeight;

                const target = {position: {x: 500, y: 0, z: -500}, rotation: {x: 3.14, y: 0, z: 0}};

                camera.position.x = (t / height) * target.position.x;
                camera.position.y = (t / height) * target.position.y;
                camera.position.z = (t / height) * target.position.z;
                camera.rotation.x = (t / height) * target.rotation.x;
                camera.rotation.y = (t / height) * target.position.y;
                camera.rotation.z = (t / height) * target.rotation.z;
            }

            document.body.onscroll = moveCamera;

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
