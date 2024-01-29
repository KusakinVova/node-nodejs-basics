import fs from 'fs';
import { pipeline } from 'stream/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const fileName = 'fileToWrite.txt';
  const sourceFolderName = 'files';
  const filePath = path.join(__dirname, sourceFolderName, fileName);

  const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

  await pipeline(process.stdin, writeStream);
};

await write();
