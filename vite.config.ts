import {defineConfig} from 'vite';
import * as path from 'path';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            // @ts-ignore
            src: path.resolve(__dirname, 'src')
        }
    },
    plugins: [react()],
    server: {
        port: 3000
    }
});
