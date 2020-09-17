import { erf } from 'mathjs';
import { Result, Bit } from '../types';
import { getCounts } from '../utils/counter';
// @ts-ignore
import fft from 'fft-js';

/**
 * Discrete Fourier transform (spectral) test as described in NIST paper: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf
 * The focus of this test is the peak heights in the Discrete Fourier Transform of the sequence.
 * The purpose of this test is to detect periodic features (i.e., repetitive patterns that are near each other) in the
 * tested sequence that would indicate a deviation from the assumption of randomness.
 * The intention is to detect whether the number of peaks exceeding the 95% threshold is significantly different than 5%.
 */
export default (bits: Bit[], alpha = 0.01): Result => {
    const n = bits.length;

    const ts: number[] = []
    // Convert to +1,-1 and make length even
    const max = (n % 2 == 0) ? n : n - 1;
    for (let i = 0; i < max; i++) {
        ts.push((bits[i] * 2) - 1);
    }

    const fs: number[] = fft.fft(ts) // Compute DFT
    const magnitudes: number[] = fft.util.fftMag(fs);

    // Compute upper threshold
    const T = Math.sqrt(Math.log(1.0 / 0.05) * n)
    const N0 = 0.95 * n / 2.0

    // Count the peaks above the upper threshold
    let N1 = 0
    for (let index = 0; index < magnitudes.length; index++) {
        if (magnitudes[index] < T) N1 += 1;
    }

    // Compute the P value
    const d = (N1 - N0) / Math.sqrt((n * 0.95 * 0.05) / 4)
    const p = 1 - erf(Math.abs(d) / Math.sqrt(2))

    const success = p >= alpha;
    return [success, p, null];
};
