import fs from 'fs';
import path from 'path';
import { Bit } from '../src/types';

const one = '1';
export const getData = (filename: string): Bit[] => {
  const buf = fs.readFileSync(path.join(__dirname, 'data', filename));
  let str = '';
  for (let index = 0; index < buf.length; index++) {
    str += buf[index].toString(2).padStart(8, '0');
  }
  return str.split('').map((piece) => (piece === one ? 1 : 0));
};
