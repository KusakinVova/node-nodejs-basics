import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  // Write your code here
  const sourceFolderName = 'files';
  const destinationFolderName = 'files_copy2';
  const sourceFolderPath = path.join(__dirname, sourceFolderName);
  const destinationFolderPath = path.join(__dirname, destinationFolderName);
  try {
    // Check folder 'files' is  existence
    try {
      await fs.access(sourceFolderPath);
    } catch (err) {
      throw new Error(`FS operation failed: Folder "${sourceFolderName}" is not found.`);
    }

    await fs.access(destinationFolderPath);
    throw new Error(`FS operation failed: Folder "${destinationFolderName}" exists`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // The file does not exist, create it and write content to it
      await fs.mkdir(destinationFolderPath);
      console.log(`Folder "${destinationFolderName}" has been created successfully.`);

      // ==============================
      // Get list files from folder
      const files = await fs.readdir(sourceFolderPath);

      if (files.length === 0) {
        console.log(`No files found in the "${sourceFolderName}" folder.`);
      } else {
        for (const file of files) {
          const sourceFile = path.join(sourceFolderPath, file);
          const destinationFile = path.join(destinationFolderPath, file);
          const content = await fs.readFile(sourceFile);
          await fs.writeFile(destinationFile, content);
        }
        console.log(
          `Folder "${sourceFolderName}" copied to "${destinationFolderName}" successfully.`,
        );
      }
      // ==============================
    } else {
      // Another error, display an error message
      console.error(error.message);
    }
  }
};

await copy();
