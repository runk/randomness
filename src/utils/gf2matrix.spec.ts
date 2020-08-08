import * as gf2matrix from './gf2matrix';

describe('gf2matrix', () => {
  it.todo('rank');

  it('matrix_from_bits', () => {
    expect(gf2matrix.matrix_from_bits(2, 3, [1, 1, 0, 0, 1, 1])).toEqual([
      [1, 1],
      [0, 0],
      [1, 1],
    ]);
  });
});
