import { Result, Bit, RandomnessTest } from '../types';
import { gammaincc } from '../utils/gamma';

const M8 = [0.2148, 0.3672, 0.2305, 0.1875];
const M128 = [0.1174, 0.243, 0.2493, 0.1752, 0.1027, 0.1124];
const M512 = [0.117, 0.246, 0.2523, 0.1755, 0.1027, 0.1124];
const M1000 = [0.1307, 0.2437, 0.2452, 0.1714, 0.1002, 0.1088];
const M10000 = [0.0882, 0.2092, 0.2483, 0.1933, 0.1208, 0.0675, 0.0727];

const probabilities = (blockSize: number, index: number) => {
  if (blockSize === 8) return M8[index];
  if (blockSize === 128) return M128[index];
  if (blockSize === 512) return M512[index];
  if (blockSize === 1000) return M1000[index];
  return M10000[index];
};

/**
 * Longest run ones in a block test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * The focus of the test is the longest run of ones within M-bit blocks. The purpose of this test is to determine whether
 * the length of the longest run of ones within the tested sequence is consistent with the length of the longest run of
 * ones that would be expected in a random sequence. Note that an irregularity in the expected length of the longest run
 * of ones implies that there is also an irregularity in the expected length of the longest run of zeroes.
 * Therefore, only a test for ones is necessary.
 */
const test: RandomnessTest = (bits: Bit[], alpha = 0.01): Result => {
  const n = bits.length;

  if (n < 128) return [false, 1];

  let blockSize = 10000;
  if (n < 6272) {
    blockSize = 8;
  } else if (n < 750000) {
    blockSize = 128;
  }

  let K;
  let blockNumber;
  // compute new values for K & N
  if (blockSize === 8) {
    K = 3;
    blockNumber = 16;
  } else if (blockSize === 128) {
    K = 5;
    blockNumber = 49;
  } else {
    K = 6;
    blockNumber = 75;
  }

  // Table of frequencies
  const frequencies = [0, 0, 0, 0, 0, 0, 0];

  // Over each block
  for (let i = 0; i < blockNumber; i++) {
    // find longest run
    const block = bits.slice(i * blockSize, (i + 1) * blockSize); // Block i

    let run = 0;
    let longest = 0;
    // Count the bits.
    for (let j = 0; j < blockSize; j++) {
      if (block[j] === 1) {
        run += 1;
        if (run > longest) {
          longest = run;
        }
      } else {
        run = 0;
      }
    }

    if (blockSize === 8) {
      if (longest <= 1) frequencies[0] += 1;
      else if (longest === 2) frequencies[1] += 1;
      else if (longest === 3) frequencies[2] += 1;
      else frequencies[3] += 1;
    } else if (blockSize === 128) {
      if (longest <= 4) frequencies[0] += 1;
      else if (longest === 5) frequencies[1] += 1;
      else if (longest === 6) frequencies[2] += 1;
      else if (longest === 7) frequencies[3] += 1;
      else if (longest === 8) frequencies[4] += 1;
      else frequencies[5] += 1;
    } else {
      if (longest <= 10) frequencies[0] += 1;
      else if (longest === 11) frequencies[1] += 1;
      else if (longest === 12) frequencies[2] += 1;
      else if (longest === 13) frequencies[3] += 1;
      else if (longest === 14) frequencies[4] += 1;
      else if (longest === 15) frequencies[5] += 1;
      else frequencies[6] += 1;
    }
  }

  // Chi-square test
  let chiSquare = 0;
  for (let i = 0; i < K + 1; i++) {
    const p_i = probabilities(blockSize, i);
    const upper = (frequencies[i] - blockNumber * p_i) ** 2;
    const lower = blockNumber * p_i;
    chiSquare += upper / lower;
  }
  const p = gammaincc(K / 2, chiSquare / 2);

  const success = p >= alpha;
  return [success, p];
};

export default test;
