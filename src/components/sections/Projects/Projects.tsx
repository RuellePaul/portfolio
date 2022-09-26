import React, {FC} from 'react';
import {Chip, Container, Paper, Stack, Typography} from '@mui/material';

interface Project {
    name: string;
    stack: string[];
}

const PROJECTS: Project[] = [
    {
        name: 'Datatensor',
        stack: ['typescript', 'react', 'python']
    },
    {
        name: 'Portfolio',
        stack: ['typescript', 'three']
    },
    {
        name: 'Facebook coding puzzles',
        stack: ['python', 'algorithmic']
    }
];

const Project: FC<{project: Project}> = ({project}) => {
    return (
        <Paper sx={{my: 8}}>
            <Typography
                variant="h3"
                color="textPrimary"
                gutterBottom
            >
                {project.name}
            </Typography>

            <Stack
                spacing={1}
                direction="row"
            >
                {project.stack.map((technology) => (
                    <Chip
                        key={technology}
                        label={
                            <Typography
                                variant="overline"
                                fontWeight={400}
                            >
                                {technology}
                            </Typography>
                        }
                        icon={
                            <img
                                src={`/static/icons/${technology}.png`}
                                alt={technology}
                                width={20}
                            />
                        }
                        clickable
                    />
                ))}
            </Stack>
        </Paper>
    );
};

function Projects() {
    return (
        <Container maxWidth="lg">
            {PROJECTS.map((project) => (
                <Project
                    project={project}
                    key={project.name}
                />
            ))}
        </Container>
    );
}

export default Projects;
