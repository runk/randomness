import { Result, Bit, RandomnessTest } from '../types';
import { erf } from 'mathjs';

const normcdf = (n: number) => 0.5 * (1 - erf(-n * Math.sqrt(0.5)));

const pValue = (n: number, z: number) => {
  let sum_a = 0;
  let start = Math.floor((-n / z + 1) / 4);
  let end = Math.floor((n / z - 1) / 4);

  for (let k = start; k < end + 1; k++) {
    const d = normcdf(((4 * k + 1) * z) / Math.sqrt(n));
    const e = normcdf(((4 * k - 1) * z) / Math.sqrt(n));
    sum_a = sum_a + d - e;
  }

  let sum_b = 0;
  start = Math.floor((-n / z - 3) / 4);
  end = Math.floor((n / z - 1) / 4);
  for (let k = start; k < end + 1; k++) {
    const d = normcdf(((4 * k + 3) * z) / Math.sqrt(n));
    const e = normcdf(((4 * k + 1) * z) / Math.sqrt(n));
    sum_b = sum_b + d - e;
  }

  const p = 1 - sum_a + sum_b;
  return p;
};

/**
 * Cumulative sums test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * The focus of this test is the maximal excursion (from zero) of the random walk defined by the cumulative sum of adjusted (-1, +1) digits in the sequence.
 * The purpose of the test is to determine whether the cumulative sum of the partial sequences occurring in the tested sequence is too large or too small
 * relative to the expected behavior of that cumulative sum for random sequences.
 * This cumulative sum may be considered as a random walk. For a random sequence, the excursions of the random walk should
 * be near zero. For certain types of non-random sequences, the excursions of this random walk from zero will be large.
 * The significance value of the test is 0.01.
 */
const test: RandomnessTest = (bits: Bit[], alpha = 0.01): Result => {
  const n = bits.length;

  // Step 1
  // Convert to +1, -1
  const x = [];
  for (const bit of bits) {
    x.push(bit * 2 - 1);
  }

  // Steps 2 and 3 Combined
  // Compute the partial sum and records the largest excursion.
  let pos = 0;
  let forwardMax = 0;
  for (const e of x) {
    pos = pos + e;
    if (Math.abs(pos) > forwardMax) forwardMax = Math.abs(pos);
  }

  pos = 0;
  let backwardMax = 0;
  for (const e of x.reverse()) {
    pos = pos + e;
    if (Math.abs(pos) > backwardMax) backwardMax = Math.abs(pos);
  }

  // Step 4
  let pForward = pValue(n, forwardMax);
  let pBackward = pValue(n, backwardMax);

  const success = pForward >= alpha && pBackward >= alpha;
  return [success, Math.min(pForward, pBackward), [pForward, pBackward]];
};

export default test;
