import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const sourceFolderName = 'files';
  const fileName = 'fileToRead.txt';
  const folderPath = path.join(__dirname, sourceFolderName);
  const filePath = path.join(folderPath, fileName);

  try {
    // Check folder existence
    try {
      await fs.access(folderPath);
    } catch (err) {
      throw new Error(`FS operation failed. Folder "${sourceFolderName}" is not found.`);
    }

    await fs.access(filePath);
    const content = await fs.readFile(filePath, 'utf8');
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`FS operation failed. File "${fileName}" is not found.`);
    } else {
      // Another error, display an error message
      console.error(error.message);
    }
  }
};

await read();
