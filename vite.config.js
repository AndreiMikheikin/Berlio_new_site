import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';

// Загрузка .env переменных
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    }),
    legacy(), // поддержка старых браузеров
    !isProd && visualizer({
      open: true,
      filename: './dist/stats.html',
    }),
  ],
  root: './src',
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]--[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: '',
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: false,
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html'),
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = path.extname(assetInfo.name);
          if (/\.(woff2?|ttf|otf|eot)$/.test(ext)) {
            return 'assets/fonts/[name].[hash][extname]';
          } else if (/\.(png|jpe?g|gif|webp)$/.test(ext)) {
            return 'assets/images/[name].[hash][extname]';
          } else if (/\.svg$/.test(ext)) {
            return 'assets/icons/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
});