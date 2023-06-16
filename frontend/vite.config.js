import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../backend/ss1/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../backend/ss1/cert.pem')),
      passphrase: 'greentech'
    }
  }
})
