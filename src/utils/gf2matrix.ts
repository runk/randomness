import { Bit, Matrix } from '../types';

export const matrix_from_bits = (M: number, Q: number, bits: Bit[]): Matrix => {
  const matrix = [];
  for (let rowIndex = 0; rowIndex < Q; rowIndex++) {
    const row = bits.slice(rowIndex * M, (rowIndex + 1) * M);
    matrix.push(row);
  }
  return matrix;
};
