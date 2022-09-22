import React, {FC, useLayoutEffect, useRef} from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import {Box, CssBaseline} from '@mui/material';
import Universe from 'src/components/Universe';

import {SectionsContext, SectionsProvider, useSections} from 'src/store/Sections';

const Section: FC<{order: number}> = ({order, children}) => {
    const ref = useRef<HTMLElement>();

    const {sections, setSections} = useSections();

    useLayoutEffect(() => {
        if (sections.length === 0) setSections((sections) => [...sections, {height: ref.current!.clientHeight, order}]);
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
                <Section order={1}>
                    <Box sx={{border: 'solid 2px red', height: 3000}} />
                </Section>
                <Section order={2}>
                    <Box sx={{border: 'solid 2px orange', height: 2000}} />
                </Section>
                <Section order={3}>
                    <Box sx={{border: 'solid 2px white', height: 4000}} />
                </Section>
            </Scrollbar>
        </SectionsProvider>
    );
}

export default App;
