import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const fileName = 'fileToRead.txt';
  const sourceFolderName = 'files';
  const filePath = path.join(__dirname, sourceFolderName, fileName);
  try {
    const stream = fs.createReadStream(filePath, 'utf8');

    stream.on('data', (data) => {
      process.stdout.write(data);
    });

    stream.on('error', (error) => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
  // Write your code here
};

await read();
