import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const fileName = 'fileToRead.txt';
  const sourceFolderName = 'files';
  const filePath = path.join(__dirname, sourceFolderName, fileName);
  const readStream = fs.createReadStream(filePath, 'utf8');

  readStream.on('data', (buf) => {
    console.log(buf);
  });
};

await read();
