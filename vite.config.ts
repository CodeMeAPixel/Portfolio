import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  server: {
    port: 94369,
    host: '0.0.0.0',
    allowedHosts: [
      'www.beta.codemeapixel.dev',
      'www.codemeapixel.dev',
      'www.beta.cmap.lol',
      'beta.codemeapixel.dev',
      'codemeapixel.dev',
      'beta.cmap.lol',
      'cmap.lol'
    ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  plugins: [
    devtools(),
    tanstackStart(),
    nitro(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
}))
