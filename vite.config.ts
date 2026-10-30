import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.join(src, 'api'),
      common: path.join(src, 'common'),
      components: path.join(src, 'components'),
      hooks: path.join(src, 'hooks'),
      pages: path.join(src, 'pages'),
      utils: path.join(src, 'utils')
    }
  }
})
