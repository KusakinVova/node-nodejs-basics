import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(data, _, callback) {
      const reversedText = data.toString().split('').reverse().join('');
      callback(null, reversedText + '\n---\n');
    },
  });
  await pipeline(process.stdin, reverseTransform, process.stdout);
};

await transform();
