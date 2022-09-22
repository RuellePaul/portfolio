import {memo, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import Engine from 'src/components/Universe/Engine';
import {useSections} from 'src/store/Sections';

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
    const {sections} = useSections();

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current && sections.length > 0) {
            // Setup
            const engine = new Engine(sections);
            engine.attach(container.current);
        }
    }, [sections]);

    return <CanvasContainer ref={container} />;
}

export default memo(Universe);
