import fs from 'fs';
import crypto from 'crypto';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const hash = crypto.createHash('sha256');
  const fileName = 'fileToCalculateHashFor.txt';
  const sourceFolderName = 'files';
  const filePath = path.join(__dirname, sourceFolderName, fileName);

  try {
    const stream = fs.createReadStream(filePath, 'utf8');

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const hexHash = hash.digest('hex');
      console.log(`SHA256 hash for ${fileName}: ${hexHash}`);
    });

    stream.on('error', (error) => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
};

await calculateHash();
