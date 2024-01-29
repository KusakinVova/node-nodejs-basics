import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const fileSource = 'fileToCompress.txt';
  const filePathSource = path.join(__dirname, 'files', fileSource);
  const fileSourceStream = createReadStream(filePathSource);

  const fileZip = 'archive.gz';
  const filePathZip = path.join(__dirname, 'files', fileZip);
  const fileZipStream = createWriteStream(filePathZip);

  const gzip = zlib.createGzip();

  fileSourceStream.pipe(gzip).pipe(fileZipStream);

  fileZipStream.on('finish', () => {
    console.log('File has been compressed successfully.');
  });

  fileSourceStream.on('error', (err) => {
    console.error(`Error reading file "${fileSource}": `, err);
  });
  fileZipStream.on('error', (err) => {
    console.error(`Error writing compressed file "${fileZip}": `, err);
  });
};

await compress();
