import React from 'react';
import Portfolio from 'src/views/Portfolio';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Portfolio />}
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
    );
}

export default App;
