import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

// Define __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Target directory and file
const dir = join(__dirname, '../../test/data');
const file = join(dir, '05-versions-space.pdf');

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
