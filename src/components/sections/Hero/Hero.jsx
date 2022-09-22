import React from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';

function Hero() {
    return (
        <Grid container>
            <Grid
                item
                xs={7}
            />
            <Grid
                item
                xs={5}
            >
                <Box height={2000} />

                <Paper sx={{background: 'transparent', backdropFilter: 'invert(1)'}}>
                    <Typography
                        variant="h1"
                        gutterBottom
                    >
                        Hello, world !
                    </Typography>

                    <Typography>Lorem ipsum dolor est...</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Hero;
