import React from 'react';
import {Box, Typography} from '@mui/material';
import labeling_images from '../../../assets/videos/labeling_images.mp4';

function Projects() {
    return (
        <Box sx={{height: 5000, background: 'transparent', backdropFilter: 'invert(1)'}}>
            <Box sx={{py: 200}}>
                <Typography variant="h1">Projects</Typography>
            </Box>
            <Box sx={{maxWidth: 300, padding: 4}}>
                <video
                    src={labeling_images}
                    autoPlay
                    draggable={false}
                    loop
                    muted
                />
            </Box>
        </Box>
    );
}

export default Projects;
