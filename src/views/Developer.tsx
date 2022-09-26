import React from 'react';
import {Chip, Container, Typography} from '@mui/material';

function Developer() {
    return (
        <Container maxWidth="lg">
            <Typography
                variant="h3"
                color="textPrimary"
                fontWeight="bold"
                gutterBottom
            >
                Datatensor
            </Typography>

            <Chip
                label={
                    <Typography
                        variant="overline"
                        fontSize={14}
                    >
                        React
                    </Typography>
                }
                icon={
                    <img
                        src="/images/react.png"
                        alt="React"
                        width={24}
                    />
                }
                clickable
            />
        </Container>
    );
}

export default Developer;
