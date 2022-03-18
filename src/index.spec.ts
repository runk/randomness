import test from 'ava';
import tests from '.';

test('exports', (t) => {
  t.assert(tests.approximateEntropyTest);
  t.assert(tests.binaryMatrixRankTest);
  t.assert(tests.dftTest);
  t.assert(tests.frequencyWithinBlockTest);
  t.assert(tests.longestRunOnesInABlockTest);
  t.assert(tests.monobitTest);
  t.assert(tests.runsTest);
});
