import { defineConfig } from 'vite';
import { resolve } from 'path';
import { partialsPlugin } from './vite-plugin-partials';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [partialsPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'src/pages/products/index.html'),
        postgresPro: resolve(__dirname, 'src/pages/postgres-pro/index.html'),
        infinidat: resolve(__dirname, 'src/pages/infinidat/index.html'),
        vastData: resolve(__dirname, 'src/pages/vast-data/index.html'),
        hammerspace: resolve(__dirname, 'src/pages/hammerspace/index.html'),
        alinom: resolve(__dirname, 'src/pages/alinom/index.html'),
        visionlabsAi: resolve(__dirname, 'src/pages/visionlabs-ai/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
        contact: resolve(__dirname, 'src/pages/contact/index.html'),
        privacy: resolve(__dirname, 'src/pages/privacy/index.html'),
        terms: resolve(__dirname, 'src/pages/terms/index.html'),
        cookies: resolve(__dirname, 'src/pages/cookies/index.html'),
        notFound: resolve(__dirname, 'src/pages/404/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
