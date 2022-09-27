import React, {FC, useLayoutEffect, useRef} from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import {Box, CssBaseline} from '@mui/material';
import Universe from 'src/components/Universe';
import {SectionsProvider, useSections} from 'src/store/Sections';
import {Hero, Projects, Skills} from 'src/components/sections';
import {Path} from 'src/components/Universe/utils/FlightPath';

const Section: FC<{paths: Path[]}> = ({paths, children}) => {
    const ref = useRef<HTMLElement>();

    const {sections, setSections} = useSections();

    useLayoutEffect(() => {
        if (sections.length === 0) setSections((sections) => [...sections, {height: ref.current!.clientHeight, paths}]);
    }, []);

    return <Box ref={ref}>{children}</Box>;
};

function Portfolio() {
    return (
        <SectionsProvider>
            <CssBaseline enableColorScheme />

            <Universe />

            <Scrollbar damping={0.1}>
                <Section
                    paths={[
                        {
                            type: 'position',
                            value: {z: 1},
                            start: 0,
                            end: 1
                        },
                        {
                            type: 'fov',
                            value: 80,
                            start: 0,
                            end: 1
                        },
                        {
                            type: 'rotation',
                            value: {x: Math.PI / 3},
                            start: 0.6,
                            end: 1
                        },
                        {
                            type: 'position',
                            value: {y: 0.5},
                            start: 0.6,
                            end: 1
                        }
                    ]}
                >
                    <Hero />
                </Section>
                <Section
                    paths={[
                        {
                            type: 'rotation',
                            value: {y: Math.PI / 10},
                            start: 0,
                            end: 1
                        },
                        {
                            type: 'offset',
                            value: {z: 20},
                            start: 0,
                            end: 1
                        }
                    ]}
                >
                    <Projects />
                </Section>
                <Section
                    paths={[
                        {
                            type: 'fov',
                            value: 120,
                            start: 0,
                            end: 1
                        },
                        {
                            type: 'offset',
                            value: {z: 200},
                            start: 0,
                            end: 1
                        }
                    ]}
                >
                    <Skills />
                </Section>
            </Scrollbar>
        </SectionsProvider>
    );
}

export default Portfolio;
