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

            // Scroll Animation
            function moveCamera() {
                const t = Math.abs(document.body.getBoundingClientRect().top);
                const height = document.body.clientHeight - window.innerHeight;

                const target = {position: {x: 0, y: 0, z: -100}, rotation: {x: 0.5, y: 0, z: -1}};

                engine.camera.position.x = (t / height) * target.position.x;
                engine.camera.position.y = (t / height) * target.position.y;
                engine.camera.position.z = (t / height) * target.position.z;
                engine.camera.rotation.x = (t / height) * target.rotation.x;
                engine.camera.rotation.y = (t / height) * target.position.y;
                engine.camera.rotation.z = (t / height) * target.rotation.z;
            }

            document.body.onscroll = moveCamera;
        }
    }, []);

    return <CanvasContainer ref={container} />;
}

export default memo(Universe);
