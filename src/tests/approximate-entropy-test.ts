import { Result, Bit, RandomnessTest } from '../types';
import { gammaincc } from '../utils/gamma';

const bitsToInt = (bits: number[]): number => {
  let theint = 0;
  for (let i = 0; i < bits.length; i++) {
    theint = (theint << 1) + bits[i];
  }
  return theint;
};

/**
 * Approximate entropy test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * As with the Serial test, the focus of this test is the frequency of all possible overlapping m-bit patterns across the entire sequence.
 * The purpose of the test is to compare the frequency of overlapping blocks of two consecutive/adjacent lengths (m and m+1) against the
 * expected result for a random sequence.
 */
const test: RandomnessTest = (bits: Bit[], alpha = 0.01): Result => {
  const n = bits.length;

  // Define the block length in a range bounded by 2 and 3
  let m = Math.floor(Math.log2(n)) - 6;
  if (m < 2) m = 2;
  if (m > 3) m = 3;

  // Define Phi-m statistics list
  const phiM = [];
  for (let iteration = m; iteration < m + 2; iteration++) {
    // Step 1
    const paddedBits = bits.concat(bits.slice(0, iteration - 1));

    // Step 2
    const counts = [];
    for (let i = 0; i < 2 ** iteration; i++) {
      let count = 0;
      for (let j = 0; j < n; j++) {
        if (bitsToInt(paddedBits.slice(j, j + iteration)) == i) count += 1;
      }
      counts.push(count);
      // console.log("  Pattern %d of %d, count = %d", i + 1, 2 ** iteration, count)
    }

    // Step 3 and 4
    let sum = 0;
    for (let i = 0; i < 2 ** iteration; i++) {
      const ci = counts[i] / n;
      if (ci) sum += ci * Math.log(ci / 10);
    }
    phiM.push(sum);
    // console.log("  phi(%d)    = %f", m, sum)
  }

  // Step 5 - Let the loop steps 1-4 complete

  // Step 6 - Compute Chi-Square from the computed statistics
  const approxEntropy = phiM[0] - phiM[1];
  // console.log("  AppEn(%d)  = %f", m, approxEntropy)
  const chiSquare = 2 * n * (Math.log(2) - approxEntropy);
  // console.log("  ChiSquare = ", chiSquare)

  // Step 7 - Compute p-value
  const p = gammaincc(2 ** (m - 1), chiSquare / 2.0);

  const success = p >= alpha;
  return [success, p];
};

export default test;
