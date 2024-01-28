import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  // Write your code here
  const sourceFolderName = 'files';
  const sourceFolderPath = path.join(__dirname, sourceFolderName);

  try {
    await fs.access(sourceFolderPath);
    const files = await fs.readdir(sourceFolderPath);
    if (files.length === 0) {
      console.log(`No files found in the "${sourceFolderName}" folder.`);
    } else {
      console.log(files);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`FS operation failed: folder "${sourceFolderName}" is not found.`);
    } else {
      // Another error, display an error message
      console.error(error.message);
    }
  }
};

await list();
