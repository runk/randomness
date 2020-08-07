import { gammaincc } from '../gamma';
import { Result, Bit } from '../types';
import { getCounts } from './utils';

/**
 * Frequency within block test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * The focus of the test is the proportion of ones within M-bit blocks. The purpose of this test is to determine whether the frequency of
 * ones in an M-bit block is approximately M/2, as would be expected under an assumption of randomness.
 * For block size M=1, this test degenerates to the Frequency (Monobit) test.
*/
export default (bits: Bit[], alpha = 0.01): Result => {
  // Compute number of blocks M = block size. N=num of blocks
  // N = floor(n/M)
  // minimum block size 20 bits, most blocks 100
  const n = bits.length;
  let M = 20
  let N = Math.floor(n / M);

  if (N > 99) {
    N = 99
    M = Math.floor(n / N)
  }

  if (n < 100) {
    throw new Error('Too little data for test. Supply at least 100 bits')
  }

  const num_of_blocks = N
  const block_size = M

  const proportions = []
  // for i in range(num_of_blocks):
  for (let i = 0; i < num_of_blocks; i++) {
    // const block = bits[i * (block_size): ((i + 1) * (block_size))]
    const block = bits.slice(i * (block_size), ((i + 1) * (block_size)))
    const [_, ones] = getCounts(block)
    proportions.push(ones / block_size)
  }

  let chisq = 0
  for (let i = 0; i < proportions.length; i++) {
    const prop = proportions[i];
    chisq += 4.0 * block_size * ((prop - 1 / 2) ** 2)
  }

  const p = gammaincc((num_of_blocks / 2.0), chisq / 2.0)
  const success = (p >= alpha)
  return [success, p, null]
}

/*
def frequency_within_block_test(bits):
    # Compute number of blocks M = block size. N=num of blocks
    # N = floor(n/M)
    # miniumum block size 20 bits, most blocks 100
    n = len(bits)
    M = 20
    N = int(math.floor(n/M))
    if N > 99:
        N=99
        M = int(math.floor(n/N))

    if len(bits) < 100:
        print("Too little data for test. Supply at least 100 bits")
        return False,1.0,None

    print("  n = %d" % len(bits))
    print("  N = %d" % N)
    print("  M = %d" % M)

    num_of_blocks = N
    block_size = M #int(math.floor(len(bits)/num_of_blocks))
    #n = int(block_size * num_of_blocks)

    proportions = list()
    for i in range(num_of_blocks):
        block = bits[i*(block_size):((i+1)*(block_size))]
        zeroes,ones = count_ones_zeroes(block)
        proportions.append(Fraction(ones, block_size))

    chisq = 0.0
    for prop in proportions:
        chisq += 4.0*block_size*((prop - Fraction(1,2))**2)

    p = gammaincc((num_of_blocks/2.0),float(chisq)/2.0)
    success = (p >= 0.01)
    return (success,p,None)
 */
