import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@mui/material';
import theme from 'src/theme';
import {Projects} from 'src/components/sections';
import Portfolio from 'src/views/Portfolio';

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
                        element={<Projects />}
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
