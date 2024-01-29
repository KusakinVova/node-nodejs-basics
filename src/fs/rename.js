import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const oldFileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';
  const sourceFolderName = 'files';
  const sourceFolderPath = path.join(__dirname, sourceFolderName);
  const oldFilePath = path.join(sourceFolderPath, oldFileName);
  const newFilePath = path.join(sourceFolderPath, newFileName);

  try {
    // Check folder 'files' is  existence
    try {
      await fs.access(sourceFolderPath);
    } catch (err) {
      throw new Error(`FS operation failed. folder "${sourceFolderName}" is not found.`);
    }

    try {
      await fs.access(oldFilePath);
    } catch (err) {
      throw new Error(`FS operation failed. file "${oldFileName}" is not found.`);
    }

    await fs.access(newFilePath);
    throw new Error(`FS operation failed. File "${newFileName}" exists`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.rename(oldFilePath, newFilePath);
      console.log(`File "${oldFileName}" has been rename to "${newFileName}" successfully.`);
    } else {
      // Another error, display an error message
      console.error(error.message);
    }
  }
};

await rename();
