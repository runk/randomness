import approximateEntropyTest from './tests/approximate-entropy-test';
import dftTest from './tests/dft-test';
import frequencyWithinBlockTest from './tests/frequency-within-block-test';
import longestRunOnesInABlockTest from './tests/longest-run-ones-in-a-block-test';
import monobitTest from './tests/monobit-test';
import runsTest from './tests/runs-test';

import { RandomnessTest } from './types';

const tests: Record<string, RandomnessTest> = {
  approximateEntropyTest,
  dftTest,
  frequencyWithinBlockTest,
  longestRunOnesInABlockTest,
  monobitTest,
  runsTest,
};

export default tests;
