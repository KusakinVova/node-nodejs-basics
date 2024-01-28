import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  // Write your code here
  const sourceFolderName = 'files';
  const fileName = 'fileToRemove.txt';

  const folderPath = path.join(__dirname, sourceFolderName);
  const filePath = path.join(folderPath, fileName);

  try {
    // Check folder 'files' is  existence
    try {
      await fs.access(folderPath);
    } catch (err) {
      throw new Error(`FS operation failed. Folder "${sourceFolderName}" is not found.`);
    }

    await fs.access(filePath);
    await fs.rm(filePath);
    console.log(`File "${fileName}" has been remove successfully.`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`FS operation failed. File "${fileName}" already remove`);
    } else {
      // Another error, display an error message
      console.error(error.message);
    }
  }
};

await remove();
