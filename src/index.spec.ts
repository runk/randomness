import { expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import tests from '.';
import { Bit } from './types';

const referenceFile = path.join(__dirname, '../resources/data/reference.txt');
const referenceText = fs.readFileSync(referenceFile, 'utf-8').trim();

// reference.txt is a string of '0'/'1' characters
const referenceBitArray: Bit[] = referenceText.split('').map((c: string) => (c === '1' ? 1 : 0));

// Pack the bit string into a Buffer (MSB-first per byte)
const referenceBuffer: Buffer = (() => {
  const len = Math.floor(referenceBitArray.length / 8);
  const buf = Buffer.alloc(len);
  for (let i = 0; i < len; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) {
      byte = (byte << 1) | referenceBitArray[i * 8 + b];
    }
    buf[i] = byte;
  }
  return buf;
})();

const referenceUint8Array: Uint8Array = new Uint8Array(referenceBuffer);

test('exports', () => {
  expect(tests.approximateEntropyTest).toBeTruthy();
  expect(tests.binaryMatrixRankTest).toBeTruthy();
  expect(tests.dftTest).toBeTruthy();
  expect(tests.frequencyWithinBlockTest).toBeTruthy();
  expect(tests.longestRunOnesInABlockTest).toBeTruthy();
  expect(tests.monobitTest).toBeTruthy();
  expect(tests.runsTest).toBeTruthy();
});

test('monobitTest accepts Bit[]', () => {
  const [success, p] = tests.monobitTest(referenceBitArray);
  expect(typeof success).toBe('boolean');
  expect(typeof p).toBe('number');
});

test('monobitTest accepts Buffer', () => {
  const [success, p] = tests.monobitTest(referenceBuffer);
  expect(typeof success).toBe('boolean');
  expect(typeof p).toBe('number');
});

test('monobitTest accepts Uint8Array', () => {
  const [success, p] = tests.monobitTest(referenceUint8Array);
  expect(typeof success).toBe('boolean');
  expect(typeof p).toBe('number');
});

test('Buffer and Uint8Array produce identical results', () => {
  const fromBuffer = tests.monobitTest(referenceBuffer);
  const fromUint8Array = tests.monobitTest(referenceUint8Array);
  expect(fromBuffer).toEqual(fromUint8Array);
});

test('Buffer and Bit[] produce identical results for packed bits', () => {
  // Use only the bits that fit into whole bytes so the two inputs are equivalent
  const truncatedBits = referenceBitArray.slice(0, referenceBuffer.length * 8);
  const fromBuffer = tests.monobitTest(referenceBuffer);
  const fromBits = tests.monobitTest(truncatedBits);
  expect(fromBuffer).toEqual(fromBits);
});
