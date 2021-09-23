import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const resolvePath = (str) => resolve(__dirname, str)
const isProd = process.env.NODE_ENV === "production"

const devConfig = defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist-demo'
  },
})

const prodConfig = defineConfig({
  build: {
    lib: {
      entry: resolvePath("lib/index.ts"),
      name: 'v-motion',
      fileName: (format) => `v-motion.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'motion'],
      output: {
        globals: {
          vue: 'Vue',
          motion: 'motion',
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      compilerOptions: {
        noEmit: false,
        declaration: true
      }
    })
  ]
})

export default isProd ? prodConfig : devConfig