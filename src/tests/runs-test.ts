import { erf } from 'mathjs';
import { Result, Bit } from '../types';
import { getCounts } from './utils';

/**
 * Runs test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * The focus of this test is the total number of runs in the sequence, where a run is an uninterrupted sequence of identical bits.
 * A run of length k consists of exactly k identical bits and is bounded before and after with a bit of the opposite value.
 * The purpose of the runs test is to determine whether the number of runs of ones and zeros of various lengths is as expected
 * for a random sequence. In particular, this test determines whether the oscillation between such zeros and ones is too fast or too slow.
 */
export default (bits: Bit[], alpha = 0.01): Result => {
  const n = bits.length
  const [zeroes, ones] = getCounts(bits)

  const prop = ones / n;

  const tau = 2 / Math.sqrt(n)

  if (Math.abs(prop - 0.5) > tau)
    return [false, 0, null];

  let observedRuns = 1;
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] != bits[i + 1])
      observedRuns += 1;
  }

  const p = 1 - erf(Math.abs(observedRuns - (2 * n * prop * (1 - prop))) / (2 * Math.sqrt(2 * n) * prop * (1 - prop)))
  const success = (p >= alpha)
  return [success, p, null];
}
