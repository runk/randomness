import { expect, test } from 'vitest';
import { getData } from '../test/utils';
import { computeRank, bitsToMatrix } from './matrix';

test('computeRank', () => {
  const bits = getData('reference.txt');
  const M = 5;
  const Q = 20;
  const matrix = bitsToMatrix(M, Q, bits);
  expect(computeRank(M, Q, matrix)).toBe(4);
});

test('bitsToMatrix', () => {
  expect(bitsToMatrix(2, 3, [1, 1, 0, 0, 1, 1])).toEqual([
    [1, 1],
    [0, 0],
    [1, 1],
  ]);
});
