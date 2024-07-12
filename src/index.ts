import approximateEntropyTest from './tests/approximate-entropy-test';
import binaryMatrixRankTest from './tests/binary-matrix-rank-test';
import cumulativeSumsTest from './tests/cumulative-sums-test';
import dftTest from './tests/dft-test';
import frequencyWithinBlockTest from './tests/frequency-within-block-test';
import longestRunOnesInABlockTest from './tests/longest-run-ones-in-a-block-test';
import monobitTest from './tests/monobit-test';
import runsTest from './tests/runs-test';

import { RandomnessTest, TestName } from './types';

const tests: Record<TestName, RandomnessTest> = {
  approximateEntropyTest,
  binaryMatrixRankTest,
  cumulativeSumsTest,
  dftTest,
  frequencyWithinBlockTest,
  longestRunOnesInABlockTest,
  monobitTest,
  runsTest,
};

export default tests;
