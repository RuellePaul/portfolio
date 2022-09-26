import React from 'react';
import Developer from 'src/views/Developer';
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
                    path="/developer"
                    element={<Developer />}
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
