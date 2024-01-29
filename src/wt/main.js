import { cpus } from 'os';
import path from 'path';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerFile = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
  const workerNthFibonacci = (data) =>
    new Promise((resolve, reject) => {
      const worker = new Worker(workerFile, {
        workerData: data,
      });

      worker.on('message', (value) => {
        const data = { status: 'resolved', data: value };
        resolve(data);
      });

      worker.on('error', () => {
        const data = { status: 'error', data: null };
        resolve(data);
      });
    });

  const countCPU = cpus().length;

  const workers = new Array(countCPU);
  for (let i = 0; i < countCPU; i++) {
    workers[i] = workerNthFibonacci(10 + i);
  }
  const result = await Promise.all(workers);
  console.log(result);
};

await performCalculations();
