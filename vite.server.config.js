import { defineConfig } from 'vite'
import { builtinModules } from 'module'

export default defineConfig({
  build: {
    ssr: true,
    outDir: 'dist/server',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: 'src/entry-server.jsx',
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
      external: [
        ...builtinModules,
        'react',
        'react-dom',
      ],
    },
  },
  ssr: {
    noExternal: ['react-helmet-async', 'react-router-dom'],
  },
})