import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

// Define __dirname for ES Module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Ensure the file is created in the project root, not relative paths
const dir = join(process.cwd(), 'test/data');
const file = resolve(dir, '05-versions-space.pdf');

// Create directory if it doesn't exist
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
  console.log(`Directory created: ${dir}`);
}

// Create file if it doesn't exist
if (!existsSync(file)) {
  writeFileSync(file, '');
  console.log(`File created: ${file}`);
} else {
  console.log('File already exists:', file);
}
