import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
 plugins: [
   react(),
   process.env.ANALYZE && visualizer({
     filename: './dist/stats.html',
     open: true,
   })
 ].filter(Boolean),
 resolve: {
   alias: {
     '@': path.resolve(__dirname, './src'),
   },
 },
 define: {
   global: 'globalThis',
 },
 server: {
   proxy: {
     '/api': {
       target: 'http://localhost:3001',
       changeOrigin: true,
       secure: false,
     },
   },
 },
});
