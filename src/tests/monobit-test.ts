import { erf } from 'mathjs';
import { Result, Bit, RandomnessTest } from '../types';
import { getCounts } from '../utils/counter';

/**
 * Monobit test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * The focus of the test is the proportion of zeroes and ones for the entire sequence. The purpose of this test is to determine
 * whether the number of ones and zeros in a sequence are approximately the same as would be expected for a truly random sequence.
 * The test assesses the closeness of the fraction of ones to 1/2, that is, the number of ones and zeroes in a sequence
 * should be about the same.
 */
const test: RandomnessTest = (bits: Bit[], alpha = 0.01): Result => {
  const n = bits.length;

  const [zeroes, ones] = getCounts(bits);
  const difference = Math.abs(ones - zeroes);

  const p = 1 - erf(difference / (Math.sqrt(n) * Math.sqrt(2.0)));

  const success = p >= alpha;
  return [success, p, null];
};

export default test;
