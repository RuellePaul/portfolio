import React from 'react';
import Portfolio from 'src/views/Portfolio';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {responsiveFontSizes, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import {Projects} from 'src/components/sections';

function App() {
    let theme = createTheme({
        palette: {
            mode: 'dark'
        },
        typography: (palette) => ({
            fontFamily: 'Sora'
        })
    });

    theme = responsiveFontSizes(theme);

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
