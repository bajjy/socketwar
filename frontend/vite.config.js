import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Function to copy files and directories
const copyDirectory = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath); // Recursively copy directories
    } else {
      fs.copyFileSync(srcPath, destPath); // Copy files
    }
  }
};

export default defineConfig({
  build: {
  },
  watch: {
    include: ['./'],
  },
  plugins: [
    {
      name: 'build-copy',
      closeBundle: async () => {
        const source = path.resolve(__dirname, 'dist');
        const destination = path.resolve(__dirname, '../backend/frontend');

        try {
          copyDirectory(source, destination);
          console.log('Copied dist folder to backend successfully.');
        } catch (error) {
          console.error('Error copying dist folder:', error);
        }
      }
    }
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    }
  }
});
