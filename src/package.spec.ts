import { execFileSync, spawnSync } from 'node:child_process';
import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, expect, test } from 'vitest';

const root = path.resolve(__dirname, '..');
const tsc = path.join(root, 'node_modules/typescript/bin/tsc');
let fixture: string;

const example = `
console.log(JSON.stringify([
  randomness.monobitTest([1, 0, 1, 1, 0, 0, 1, 0]),
  randomness.runsTest(Uint8Array.from([0xb2, 0x0f])),
  randomness.dftTest(Buffer.from([0xb2, 0x0f])),
]));
`;

beforeAll(() => {
  // Exercise the emitted JavaScript and declarations through a package import.
  execFileSync(process.execPath, [tsc], { cwd: root, encoding: 'utf8' });
  fixture = mkdtempSync(path.join(tmpdir(), 'randomness-package-'));
  mkdirSync(path.join(fixture, 'node_modules'));
  symlinkSync(root, path.join(fixture, 'node_modules/randomness'), 'dir');
}, 30_000);

afterAll(() => {
  if (fixture) rmSync(fixture, { recursive: true, force: true });
});

test.each([
  ['mjs', "import randomness from 'randomness';"],
  ['cjs', "const randomness = require('randomness');"],
  ['legacy.cjs', "const randomness = require('randomness').default;"],
])('README examples run in Node.js (%s)', (extension, load) => {
  const file = path.join(fixture, `runtime.${extension}`);
  writeFileSync(file, load + example);
  const results = JSON.parse(
    execFileSync(process.execPath, [file], { encoding: 'utf8' })
  );
  expect(results[0]).toEqual([true, 1]);
  expect(results[1][0]).toBe(true);
  expect(results[1][1]).toBeCloseTo(0.6170750774519739, 14);
  expect(results[2][0]).toBe(true);
  expect(results[2][1]).toBeCloseTo(0.16866861888781526, 14);
});

test.each([
  ['mts', "import randomness from 'randomness';"],
  ['cts', "import randomness = require('randomness');"],
  ['default.cts', "import randomness from 'randomness';"],
])(
  'README examples type-check with NodeNext (%s)',
  (extension, load) => {
    const file = path.join(fixture, `types.${extension}`);
    writeFileSync(
      file,
      load +
        example +
        `
const result: [boolean, number, number[]?] = randomness.monobitTest([0, 1]);
// @ts-expect-error Only bits, buffers, and byte arrays are supported.
randomness.monobitTest('0101');
`
    );
    const result = spawnSync(
      process.execPath,
      [
        tsc,
        '--noEmit',
        '--strict',
        '--module',
        'nodenext',
        '--moduleResolution',
        'nodenext',
        '--types',
        'node',
        '--typeRoots',
        path.join(root, 'node_modules/@types'),
        file,
      ],
      { cwd: fixture, encoding: 'utf8' }
    );
    expect(result.stdout + result.stderr).toBe('');
    expect(result.status).toBe(0);
  },
  30_000
);
