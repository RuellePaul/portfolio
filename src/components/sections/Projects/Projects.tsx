import React, {FC, ReactNode} from 'react';
import {Box, Button, Chip, Container, Link, Paper, Stack, SvgIcon, Tooltip, Typography} from '@mui/material';
import ArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface Project {
    name: string;
    stack: string[];
    description: ReactNode;
    github_url: string;
    image: string;
    legend: string;
    overlay_image: string | null;
}

const PROJECTS: Project[] = [
    {
        name: 'Datatensor',
        stack: ['typescript', 'react', 'python'],
        description:
            'Datatensor is a web application to prepare and manage image datasets for object detection, using an existing dataset or creating one from scratch.',
        github_url: 'https://github.com/RuellePaul/datatensor',
        image: 'datatensor.png',
        legend: 'Datatensor homepage',
        overlay_image: 'space-girl.svg'
    },
    {
        name: 'Portfolio',
        stack: ['typescript', 'three.js'],
        description: 'The website you are currently browsing, built using three.js library.',
        github_url: 'https://github.com/RuellePaul/portfolio',
        image: '',
        legend: '',
        overlay_image: null
    },
    {
        name: 'Facebook coding puzzles',
        stack: ['python', 'algorithmic'],
        description: (
            <>
                Meta's problems and solutions for practising their job interviews. Ranked in order of difficulty from 1
                to 4.
                <br />
                Give it a try on{' '}
                <Link
                    component="a"
                    href="https://www.metacareers.com/profile/coding_puzzles/"
                    target="_blank"
                >
                    metacareers.com/profile/coding_puzzles
                </Link>
                .
            </>
        ),
        github_url: 'https://github.com/RuellePaul/facebook-coding-puzzles',
        image: 'facebook-coding-puzzles.png',
        legend: 'State of progress of their puzzles solving',
        overlay_image: null
    },
    {
        name: 'Particle filter',
        stack: ['python', 'algorithmic'],
        description:
            'A visual implementation of a particle filter to estimate the position of an aircraft on steep terrain.',
        github_url: 'https://github.com/ThomasRoudil/ParticleFilter',
        image: 'particle-filter.png',
        legend: 'Inference of our particle filter',
        overlay_image: null
    }
];

const GithubIcon: FC = () => {
    return (
        <SvgIcon>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </SvgIcon>
    );
};

const Project: FC<{project: Project}> = ({project}) => {
    return (
        <Paper
            sx={{
                p: 3,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(5px)',
                border: 'solid 1px black',
                boxShadow: '0px 0px 5px 2px #90caf94a'
            }}
        >
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

            <Typography
                variant="body1"
                color="textPrimary"
                sx={{my: 3, maxWidth: 650}}
            >
                {project.description}
            </Typography>

            <img
                src={`/static/images/${project.image}`}
                alt={project.image}
                width="100%"
            />

            <Typography
                variant="caption"
                component="p"
                color="textSecondary"
                align="center"
            >
                {project.legend}
            </Typography>

            <Stack
                direction="row"
                spacing={2}
                sx={{mt: 3}}
            >
                <Button
                    endIcon={<ArrowRight />}
                    variant="contained"
                >
                    Learn more
                </Button>
                <Tooltip title="Open in Github">
                    <Button
                        component="a"
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<GithubIcon />}
                        size="large"
                        variant="outlined"
                    >
                        {project.name}
                    </Button>
                </Tooltip>
            </Stack>

            {project.overlay_image && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-100px',
                        right: '-100px',
                        height: 300
                    }}
                >
                    <img
                        src={`/static/images/${project.overlay_image}`}
                        alt={project.overlay_image}
                        height="100%"
                    />
                </Box>
            )}
        </Paper>
    );
};

function Projects() {
    return (
        <Container
            maxWidth="lg"
            sx={{p: '0px !important'}}
        >
            <Container
                maxWidth="md"
                sx={{margin: 'initial', minHeight: 5000}}
            >
                {PROJECTS.map((project) => (
                    <Box sx={{mb: '200px'}}>
                        <Project
                            project={project}
                            key={project.name}
                        />
                    </Box>
                ))}
            </Container>
        </Container>
    );
}

export default Projects;
