import { Result, Bit, RandomnessTest } from '../types';
import { computeRank, bitsToMatrix } from '../utils/matrix';

const test: RandomnessTest = (
  bits: Bit[],
  M = 32,
  Q = 32,
  alpha = 0.01
): Result => {
  const n = bits.length;
  const N = Math.floor(n / (M * Q)); // Number of blocks

  if (N < 38) {
    throw new Error(
      'Too little data for test. Number of blocks must be greater than 37'
    );
  }

  // console.log("  Number of blocks %d", N)
  // console.log("  Data bits used: %d", (N * M * Q))
  // console.log("  Data bits discarded: %d", (n - (N * M * Q)))

  let upper1, upper2, lower;
  // Compute the reference probabilities for FM, FMM and remainder
  let r = M;
  let product = 1;
  for (let i = 0; i < r; i++) {
    upper1 = 1 - 2 ** (i - Q);
    upper2 = 1 - 2 ** (i - M);
    lower = 1 - 2 ** (i - r);
    product = product * ((upper1 * upper2) / lower);
  }
  const FR_prob = product * 2 ** (r * (Q + M - r) - M * Q);

  r = M - 1;
  product = 1;
  for (let i = 0; i < r; i++) {
    upper1 = 1 - 2 ** (i - Q);
    upper2 = 1 - 2 ** (i - M);
    lower = 1 - 2 ** (i - r);
    product = product * ((upper1 * upper2) / lower);
  }
  const FRM1_prob = product * 2 ** (r * (Q + M - r) - M * Q);

  const LR_prob = 1 - (FR_prob + FRM1_prob);

  let FM = 0; // Number of full rank matrices
  let FMM = 0; // Number of rank -1 matrices
  let remainder = 0;
  for (let blockNumber = 0; blockNumber < N; blockNumber++) {
    const block = bits.slice(
      blockNumber * (M * Q),
      (blockNumber + 1) * (M * Q)
    );

    // Compute rank
    const matrix = bitsToMatrix(M, Q, block);
    const rank = computeRank(M, Q, matrix);

    if (rank == M) FM += 1;
    else if (rank == M - 1) FMM += 1;
    else remainder += 1;
  }

  let chiSquare = (FM - FR_prob * N) ** 2 / (FR_prob * N);
  chiSquare += (FMM - FRM1_prob * N) ** 2 / (FRM1_prob * N);
  chiSquare += (remainder - LR_prob * N) ** 2 / (LR_prob * N);
  const p = Math.E ** (-chiSquare / 2);
  const success = p >= alpha;

  // console.log("  Full Rank Count  = ", FM)
  // console.log("  Full Rank -1 Count = ", FMM)
  // console.log("  Remainder Count = ", remainder)
  // console.log("  Chi-Square = ", chiSquare)

  return [success, p];
};

export default test;
