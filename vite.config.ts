import { defineConfig } from 'vite';
import { resolve } from 'path';
import { partialsPlugin } from './vite-plugin-partials';
import { BASE_PATH } from './src/config/base-path';

export default defineConfig({
  base: BASE_PATH,
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
        visionlabsAi: resolve(__dirname, 'src/pages/visionlabs-ai/index.html'),
        rhel: resolve(__dirname, 'src/pages/rhel/index.html'),
        hpe: resolve(__dirname, 'src/pages/hpe/index.html'),
        cloudian: resolve(__dirname, 'src/pages/cloudian/index.html'),
        yubico: resolve(__dirname, 'src/pages/yubico/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
        blog: resolve(__dirname, 'src/pages/blog/index.html'),
        career: resolve(__dirname, 'src/pages/career/index.html'),
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