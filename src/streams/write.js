import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const fileName = 'fileToWrite.txt';
  const sourceFolderName = 'files';
  const filePath = path.join(__dirname, sourceFolderName, fileName);

  try {
    const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

    process.stdin.on('data', (data) => {
      writeStream.write(data);
    });
    process.stdin.on('end', () => {
      writeStream.end();
    });
    process.stdin.on('error', (error) => {
      console.error('Error of reading from stdin:', error.message);
    });

    writeStream.on('error', (error) => {
      console.error(`Error of  write in file "${fileName}":`, error.message);
    });
  } catch (error) {
    console.error(error);
  }
};

await write();
