import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // The 'react' plugin is essential for handling JSX syntax 
  // and providing features like Hot Module Replacement (HMR) for React components.
  plugins: [react()],
})
