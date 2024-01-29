import { fileURLToPath } from 'url';
import cp from 'child_process';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProc = cp.spawn('node', [file, ...args]);

  process.stdin.pipe(childProc.stdin);
  childProc.stdout.pipe(process.stdout);
};

spawnChildProcess(['100500', 'kitkat']);
