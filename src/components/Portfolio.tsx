import styled from '@emotion/styled';

const MainContainer = styled.main`
    height: 1000vh; // FIXME

    width: 100vw;
    color: white;
    z-index: 99;
    position: absolute;
    margin: 0px auto;
    padding: 120px 0px;

    display: grid;
    grid-template-columns: repeat(12, 1fr);

    h1,
    h2,
    h3,
    blockquote {
        font-family: elevon, sans-serif;
        font-weight: 700;
        font-style: normal;
    }

    header {
        background: var(--dark-bg);
        grid-column: 2 / span 5;
        font-size: 2.5rem;
        padding: 2rem;
        margin-bottom: var(--spacing);
    }

    section {
        grid-column: 2 / 8;
        padding: 1rem;
        background: var(--dark-bg);
        font-size: 1.25rem;
        line-height: 1.5;
        margin-bottom: var(--spacing);
    }

    blockquote {
        margin: 0;
        padding: 0;
        grid-column: 2 / span 9;
        margin-bottom: var(--spacing);
    }

    blockquote p {
        color: black;
        background-color: white;
        font-size: 4rem;
        display: inline;
        line-height: 1;
    }
`;

function Portfolio() {
    return (
        <MainContainer>
            <header>
                <h1>Paul Ruelle</h1>
                <p>🚀 Full stack developer</p>
            </header>

            <blockquote>
                <p>Lorem ipsum dolor</p>
            </blockquote>

            <section>
                <h2>Lorem ipsum dolor sit amet</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </section>
        </MainContainer>
    );
}

export default Portfolio;
