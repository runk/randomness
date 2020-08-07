import fs from 'fs';
import path from 'path';
import { Bit } from '../src/types';

const one = '1';
const cache: Record<string, Bit[]> = {};
export const getData = (filename: string): Bit[] => {
  if (cache[filename]) return cache[filename];

  const buf = fs.readFileSync(path.join(__dirname, 'data', filename));
  let str = '';
  for (let index = 0; index < buf.length; index++) {
    str += buf[index].toString(2).padStart(8, '0');
  }

  const bits = str.split('').map((piece) => (piece === one ? 1 : 0));
  cache[filename] = bits;
  return bits;
};
