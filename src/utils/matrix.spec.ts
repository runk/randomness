import test from 'ava';
import { getData } from '../test/utils';
import { computeRank, bitsToMatrix } from './matrix';

test('computeRank', (t) => {
  const bits = getData('reference.txt');
  const M = 5;
  const Q = 20;
  const matrix = bitsToMatrix(M, Q, bits);
  t.is(computeRank(M, Q, matrix), 4);
});

test('bitsToMatrix', (t) => {
  t.deepEqual(bitsToMatrix(2, 3, [1, 1, 0, 0, 1, 1]), [
    [1, 1],
    [0, 0],
    [1, 1],
  ]);
});
