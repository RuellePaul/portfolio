import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@mui/material';
import theme from 'src/theme';
import Portfolio from 'src/views/Portfolio';

const SmoothBehaviorTest = () => {
    useEffect(() => {
        (document.querySelector('.scroll-content') as HTMLElement).style.scrollBehavior = 'smooth';
    }, []);

    return null;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Portfolio />}
                    />
                    <Route
                        path="/developer"
                        element={
                            <>
                                <Portfolio />
                                <SmoothBehaviorTest />
                            </>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate
                                replace
                                to="/"
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
