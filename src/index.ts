import approximateEntropyTest from './tests/approximate-entropy-test';
import binaryMatrixRankTest from './tests/binary-matrix-rank-test';
import cumulativeSumsTest from './tests/cumulative-sums-test';
import dftTest from './tests/dft-test';
import frequencyWithinBlockTest from './tests/frequency-within-block-test';
import longestRunOnesInABlockTest from './tests/longest-run-ones-in-a-block-test';
import monobitTest from './tests/monobit-test';
import runsTest from './tests/runs-test';

import { Bit, InternalRandomnessTest, RandomnessTest, TestName } from './types';

const isBitArray = (input: Buffer | Uint8Array | Bit[]): input is Bit[] =>
  Array.isArray(input);

const bufferToBits = (input: Buffer | Uint8Array): Bit[] => {
  const bits: Bit[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let b = 7; b >= 0; b--) {
      bits.push(((input[i] >> b) & 1) as Bit);
    }
  }
  return bits;
};

const wrap = (fn: InternalRandomnessTest): RandomnessTest =>
  (input: Buffer | Uint8Array | Bit[], alpha?: number) =>
    fn(isBitArray(input) ? input : bufferToBits(input), alpha);

const tests: Record<TestName, RandomnessTest> = {
  approximateEntropyTest: wrap(approximateEntropyTest),
  binaryMatrixRankTest: wrap(binaryMatrixRankTest),
  cumulativeSumsTest: wrap(cumulativeSumsTest),
  dftTest: wrap(dftTest),
  frequencyWithinBlockTest: wrap(frequencyWithinBlockTest),
  longestRunOnesInABlockTest: wrap(longestRunOnesInABlockTest),
  monobitTest: wrap(monobitTest),
  runsTest: wrap(runsTest),
};

export default tests;
