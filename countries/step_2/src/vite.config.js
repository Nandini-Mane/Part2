import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// You might need to import 'node:dns' if you face issues with 'localhost' in some environments.
// import dns from 'node:dns';
// dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react()],
  
  // This server configuration block is critical for environments (like WSL2, 
  // Docker, or network drives) where native file-watching fails.
  server: {
    // Setting a specific host can sometimes help with connectivity
    host: '0.0.0.0', // Listen on all network interfaces
    // Force watch configuration to use polling
    watch: {
      // Polling is less efficient (higher CPU) but necessary when file events 
      // are not reliably propagated.
      usePolling: true, 
      // Ignored files (if you have large node_modules in a non-standard location)
      ignored: ['**/node_modules/**'],
    }
  }
});
