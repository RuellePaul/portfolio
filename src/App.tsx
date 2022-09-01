import Universe from 'src/components/Universe.tsx';

function App() {
    return (
        <>
            <Universe />

            <main
                style={{
                    width: '100vw',
                    background: 'transparent',
                    zIndex: 10,
                    position: 'absolute',
                    top: '200vh',
                    left: 0,
                    height: 2000,
                    backdropFilter: 'invert(1)'
                }}
            >
                ...
            </main>
        </>
    );
}

export default App;
