import { gammaincc } from '../gamma';
import { Result, Bit } from '../types';
import { getCounts } from './utils';

const defaultBlockSize = 20;
const blockNumberMax = 100;
const sequenceSizeMin = 100;

/**
 * Frequency within block test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * The focus of the test is the proportion of ones within M-bit blocks. The purpose of this test is to determine whether the frequency of
 * ones in an M-bit block is approximately M/2, as would be expected under an assumption of randomness.
 * For block size M=1, this test degenerates to the Frequency (Monobit) test.
 */
export default (bits: Bit[], alpha = 0.01): Result => {
  const n = bits.length;

  if (n < sequenceSizeMin) {
    throw new Error('Too little data for test. Supply at least 100 bits');
  }

  // Compute number of blocks M = block size. N=num of blocks
  // N = floor(n/M)
  // minimum block size 20 bits, most blocks 100
  let M = defaultBlockSize;
  let N = Math.floor(n / M);

  if (N > blockNumberMax) {
    N = blockNumberMax - 1;
    M = Math.floor(n / N);
  }

  const totalBlocks = N;
  const blockSize = M;

  const proportions = [];
  for (let i = 0; i < totalBlocks; i++) {
    const block = bits.slice(i * blockSize, (i + 1) * blockSize);
    const [_, ones] = getCounts(block);
    proportions.push(ones / blockSize);
  }

  // Chi-square test
  let chiSquare = 0;
  for (let i = 0; i < proportions.length; i++) {
    chiSquare += 4 * blockSize * (proportions[i] - 1 / 2) ** 2;
  }

  // Compute score (P-value) applying the lower incomplete gamma function
  const p = gammaincc(totalBlocks / 2, chiSquare / 2);
  const success = p >= alpha;
  return [success, p, null];
};
