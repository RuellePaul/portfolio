import React, {FC, useLayoutEffect, useRef} from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import {Box, CssBaseline} from '@mui/material';
import Universe from 'src/components/Universe';

import {SectionsContext, SectionsProvider, useSections} from 'src/store/Sections';
import {Path} from 'src/components/Universe/utils/FlightPath';
import {easing} from 'src/components/Universe/utils/math';

const Section: FC<{paths: Path[]}> = ({paths, children}) => {
    const ref = useRef<HTMLElement>();

    const {sections, setSections} = useSections();

    useLayoutEffect(() => {
        if (sections.length === 0) setSections((sections) => [...sections, {height: ref.current!.clientHeight, paths}]);
    }, []);

    return <Box ref={ref}>{children}</Box>;
};

function App() {
    return (
        <SectionsProvider>
            <CssBaseline enableColorScheme />

            <Universe />

            <SectionsContext.Consumer>
                {(value) => (
                    <pre style={{position: 'fixed', color: 'white'}}>{JSON.stringify(value.sections, null, 4)}</pre>
                )}
            </SectionsContext.Consumer>

            <Scrollbar damping={0.1}>
                <Section
                    paths={[
                        {
                            type: 'position',
                            value: {x: 100, z: 100},
                            start: 0,
                            end: 0.4,
                            easing: easing.inSine
                        },
                        {
                            type: 'rotation',
                            value: {y: Math.PI / 2},
                            start: 0,
                            end: 0.4,
                            easing: easing.inSine
                        },
                        {
                            type: 'fov',
                            value: 120,
                            start: 0.75,
                            end: 1,
                            easing: easing.inSine
                        },
                        {
                            type: 'offset',
                            value: {x: -150},
                            start: 0.75,
                            end: 1,
                            easing: easing.inSine
                        }
                    ]}
                >
                    <Box sx={{border: 'dashed 5px red', height: 3000}} />
                </Section>
                <Section
                    paths={[
                        {
                            type: 'rotation',
                            value: {x: Math.PI / 2},
                            start: 1,
                            end: 1.4,
                            easing: easing.inSine
                        }
                    ]}
                >
                    <Box sx={{border: 'dashed 5px orange', height: 4000}} />
                </Section>
                <Section
                    paths={[
                        {
                            type: 'offset',
                            value: {z: 200},
                            start: 2,
                            end: 2.8,
                            easing: easing.inSine
                        }
                    ]}
                >
                    <Box sx={{border: 'dashed 5px orange', height: 5000}} />
                </Section>
            </Scrollbar>
        </SectionsProvider>
    );
}

export default App;
