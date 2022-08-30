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
    const container = useRef();

    useEffect(() => {
        // Setup

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('canvas')
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);
        camera.position.setX(-3);

        renderer.render(scene, camera);

        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({color: 0xffffff});

        // Lights

        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);

        // Helpers

        // const lightHelper = new THREE.PointLightHelper(pointLight)
        // const gridHelper = new THREE.GridHelper(200, 50);
        // scene.add(lightHelper, gridHelper)

        // const controls = new OrbitControls(camera, renderer.domElement);

        function addStar() {
            const geometry = new THREE.BoxGeometry(randInt(3, 10), randInt(3, 10), randInt(3, 10));
            const star = new THREE.Mesh(geometry, material);

            const [x, y, z] = Array(3)
                .fill()
                .map(() => THREE.MathUtils.randFloatSpread(1000));

            star.position.set(x, y, z);
            scene.add(star);
        }

        Array(300).fill().forEach(addStar);

        // Scroll Animation

        function moveCamera() {
            const t = document.body.getBoundingClientRect().top;

            camera.position.z = t * -0.1;
            camera.position.x = t * -0.002;
            camera.rotation.y = t * -0.0002;
            camera.rotation.z = t * -0.0002;
        }

        document.body.onscroll = moveCamera;
        moveCamera();

        // Animation Loop

        function animate() {
            requestAnimationFrame(animate);

            // controls.update();

            renderer.render(scene, camera);
        }

        animate();
    }, []);

    return (
        <CanvasContainer ref={container}>
            <canvas />
        </CanvasContainer>
    );
}

export default memo(Universe);
