import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  // Write your code here

  const sourceFolderName = 'files';
  const fileName = 'fresh.txt';

  const folderPath = path.join(__dirname, sourceFolderName);
  const filePath = path.join(folderPath, fileName);
  const fileContent = 'I am fresh and young';

  try {
    // Check folder existence
    try {
      await fs.access(folderPath);
    } catch (err) {
      console.log(`Folder "${sourceFolderName}" is not found.`);
      throw new Error(err);
    }

    // Check file existence. If the file exists, throw an error
    await fs.access(filePath);
    throw new Error(`FS operation failed. File "${fileName}" already exists`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // The file does not exist, create it and write content to it
      await fs.writeFile(filePath, fileContent);
      console.log(`File "${fileName}" has been created successfully.`);
    } else {
      // Another error, display an error message
      console.error(error.message);
    }
  }
};

await create();
