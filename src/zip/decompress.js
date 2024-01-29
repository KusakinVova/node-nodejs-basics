import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const fileZip = 'archive.gz';
  const filePathZip = path.join(__dirname, 'files', fileZip);

  const fileUnzip = 'fileToCompress.txt';
  const filePathUnzip = path.join(__dirname, 'files', fileUnzip);

  const fileZipReadStream = createReadStream(filePathZip);
  const decompressWriteStream = createWriteStream(filePathUnzip);

  const decompressStream = zlib.createGunzip();
  fileZipReadStream.pipe(decompressStream).pipe(decompressWriteStream);

  decompressWriteStream.on('finish', () => {
    console.log('Decompress has been finished.');
  });
};

await decompress();
