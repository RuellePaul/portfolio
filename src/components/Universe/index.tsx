import {memo, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
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
            const engine = new Engine();
            engine.attach(container.current);
        }
    }, []);

    return <CanvasContainer ref={container} />;
}

export default memo(Universe);
