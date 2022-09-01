import styled from '@emotion/styled';

const MainContainer = styled.main`
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

    .left {
        grid-column: 6 / 12;
    }
`;

function Portfolio() {
    return (
        <MainContainer>
            <header>
                <h1>Mon Super Pouvoir</h1>
                <p>🚀 Reprenez le pouvoir sur vos dépenses!</p>
            </header>

            <blockquote>
                <p>Lorem ipsum dolor</p>
            </blockquote>

            <section>
                <h2>📜 Détection des abonnements</h2>
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

            <section className="light">
                <h2>Features</h2>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h2>🏆 Success</h2>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </section>

            <blockquote>
                <p>
                    Le meilleur comparateur pour réduire ses dépenses
                </p>
            </blockquote>

            <section className="left">
                <h2>🌮 Work History</h2>

                <h3>McDonalds</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h3>Burger King</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h3>Taco Bell</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </section>

            <blockquote>
                <p>Thanks for watching!</p>
            </blockquote>
        </MainContainer>
    );
}

export default Portfolio;
