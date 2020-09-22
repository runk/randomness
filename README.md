### randomness

Randomness tests based on [NIST SP 800-22](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf) whitepaper.

### Usage

```typescript
import randomness from 'randomness';

// series of bits
const data = [0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, ...];
console.log(randomness.monobitTest(data));
```

### Reference

All tests return the same type of result:

```typescript
type Result = [test: boolean, pValue: number]
```

- First element is a result of test evaluation - whether sequence is random or not. When `p-value ≥ alpha` (alpha is 0.01 by default), accept the sequence as random.
- Second element is the `p-value` itself.


#### Supported randomness tests

- `approximateEntropyTest`: Approximate entropy test. As with the Serial test, the focus of this test is the frequency of all possible overlapping m-bit patterns across the entire sequence. The purpose of the test is to compare the frequency of overlapping blocks of two consecutive/adjacent lengths (m and m+1) against the expected result for a random sequence.

- `binaryMatrixRankTest`: Binary matrix rank test. The focus of the test is the rank of disjoint sub-matrices of the entire sequence. The purpose of this test is to check for linear dependence among fixed length substrings of the original sequence.

- `dftTest`: Discrete Fourier transform (spectral) test. The focus of this test is the peak heights in the Discrete Fourier Transform of the sequence. The purpose of this test is to detect periodic features (i.e., repetitive patterns that are near each other) in the tested sequence that would indicate a deviation from the assumption of randomness. The intention is to detect whether the number of peaks exceeding the 95% threshold is significantly different than 5%.

- `frequencyWithinBlockTest`: Frequency within block test. The focus of the test is the proportion of ones within M-bit blocks. The purpose of this test is to determine whether the frequency of ones in an M-bit block is approximately M/2, as would be expected under an assumption of randomness. For block size M=1, this test degenerates to the Frequency (Monobit) test.

- `longestRunOnesInABlockTest`: Longest run ones in a block test. The focus of the test is the longest run of ones within M-bit blocks. The purpose of this test is to determine whether the length of the longest run of ones within the tested sequence is consistent with the length of the longest run of ones that would be expected in a random sequence. Note that an irregularity in the expected length of the longest run of ones implies that there is also an irregularity in the expected length of the longest run of zeroes. Therefore, only a test for ones is necessary.

- `monoBitTest`: Monobit test. The focus of the test is the proportion of zeroes and ones for the entire sequence. The purpose of this test is to determine whether the number of ones and zeros in a sequence are approximately the same as would be expected for a truly random sequence. The test assesses the closeness of the fraction of ones to 1/2, that is, the number of ones and zeroes in a sequence should be about the same.

- `runsTest`: Runs test. The focus of this test is the total number of runs in the sequence, where a run is an uninterrupted sequence of identical bits. A run of length k consists of exactly k identical bits and is bounded before and after with a bit of the opposite value. The purpose of the runs test is to determine whether the number of runs of ones and zeros of various lengths is as expected for a random sequence. In particular, this test determines whether the oscillation between such zeros and ones is too fast or too slow.

### References

- https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
- https://csrc.nist.gov/Projects/Random-Bit-Generation/Documentation-and-Software
- https://github.com/dj-on-github/sp800_22_tests
- https://github.com/InsaneMonster/NistRng
- https://www.npmjs.com/package/nist-randomness-test-suite
