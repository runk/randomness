import fs from 'fs';
import path from 'path';
import { Bit } from '../types';

const fromString = (str: string): Bit[] =>
  str.split('').map((piece) => (piece === one ? 1 : 0));

const one = '1';

const cache: Record<string, Bit[]> = {};

export const getData = (filename: string): Bit[] => {
  if (cache[filename]) return cache[filename];

  const buf = fs.readFileSync(
    path.join(__dirname, '../../resources/data', filename)
  );

  if (path.extname(filename) === '.bin') {
    let str = '';
    for (let index = 0; index < buf.length; index++) {
      str += buf[index].toString(2).padStart(8, '0');
    }

    const bits = fromString(str);
    cache[filename] = bits;
    return bits;
  } else if (path.extname(filename) === '.txt') {
    const bits = fromString(buf.toString('utf-8').trim());
    cache[filename] = bits;
    return bits;
  }

  throw new Error('Unsupported extension');
};

export const round = (n: number, precision = 6): number => Number(n.toFixed(precision));
