import React, {FC} from 'react';
import Universe from 'src/components/Universe';
import Scrollbar from 'react-smooth-scrollbar';
import {Box} from '@mui/material';

const Section: FC = ({children}) => (
    <Box sx={{border: 'solid 2px red', height: '200vh', color: 'white', fontSize: 200}}>{children}</Box>
);

function App() {
    return (
        <>
            <Universe />

            <Scrollbar damping={0.1}>
                <Section>1</Section>
                <Section>2</Section>
                <Section>3</Section>
            </Scrollbar>
        </>
    );
}

export default App;
