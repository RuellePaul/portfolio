import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';

import '@fontsource/sora/200.css';
import '@fontsource/sora/300.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/500.css';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
