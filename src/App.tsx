import Universe from 'src/components/Universe';
import Portfolio from 'src/components/Portfolio';
import Scrollbar from 'react-smooth-scrollbar';

function App() {
    return (
        <>
            <Universe />

            <Scrollbar damping={0.15}>
                <Portfolio />
            </Scrollbar>
        </>
    );
}

export default App;
