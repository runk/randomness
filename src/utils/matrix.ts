import { Bit, Matrix } from '../types';

/**
 * Code is ported from `matrix.c` library found in
 * https://csrc.nist.gov/Projects/Random-Bit-Generation/Documentation-and-Software
 */

const MATRIX_FORWARD_ELIMINATION = 0;
const MATRIX_BACKWARD_ELIMINATION = 1;

export const bitsToMatrix = (M: number, Q: number, bits: Bit[]): Matrix => {
  const matrix = [];
  for (let rowIndex = 0; rowIndex < Q; rowIndex++) {
    const row = bits.slice(rowIndex * M, (rowIndex + 1) * M);
    matrix.push(row);
  }
  return matrix;
};

export const computeRank = (M: number, Q: number, matrix: Matrix): number => {
  const m = Math.min(M, Q);

  /* FORWARD APPLICATION OF ELEMENTARY ROW OPERATIONS */
  for (let i = 0; i < m - 1; i++) {
    if (matrix[i][i] == 1)
      perform_elementary_row_operations(
        MATRIX_FORWARD_ELIMINATION,
        i,
        M,
        Q,
        matrix
      );
    else {
      /* matrix[i][i] = 0 */
      if (
        find_unit_element_and_swap(
          MATRIX_FORWARD_ELIMINATION,
          i,
          M,
          Q,
          matrix
        ) == 1
      )
        perform_elementary_row_operations(
          MATRIX_FORWARD_ELIMINATION,
          i,
          M,
          Q,
          matrix
        );
    }
  }

  /* BACKWARD APPLICATION OF ELEMENTARY ROW OPERATIONS */
  for (let i = m - 1; i > 0; i--) {
    if (matrix[i][i] == 1)
      perform_elementary_row_operations(
        MATRIX_BACKWARD_ELIMINATION,
        i,
        M,
        Q,
        matrix
      );
    else {
      /* matrix[i][i] = 0 */
      if (
        find_unit_element_and_swap(
          MATRIX_BACKWARD_ELIMINATION,
          i,
          M,
          Q,
          matrix
        ) == 1
      )
        perform_elementary_row_operations(
          MATRIX_BACKWARD_ELIMINATION,
          i,
          M,
          Q,
          matrix
        );
    }
  }

  return determine_rank(m, M, Q, matrix);
};

const perform_elementary_row_operations = (
  flag: number,
  i: number,
  M: number,
  Q: number,
  A: Matrix
): void => {
  let k: number;

  if (flag == MATRIX_FORWARD_ELIMINATION) {
    for (let j = i + 1; j < M; j++)
      if (A[j][i] == 1)
        for (k = i; k < Q; k++) A[j][k] = (A[j][k] + A[i][k]) % 2;
  } else {
    for (let j = i - 1; j >= 0; j--)
      if (A[j][i] == 1)
        for (k = 0; k < Q; k++) A[j][k] = (A[j][k] + A[i][k]) % 2;
  }
};

const find_unit_element_and_swap = (
  flag: number,
  i: number,
  M: number,
  Q: number,
  A: Matrix
): number => {
  let index: number;
  let row_op: number = 0;

  if (flag == MATRIX_FORWARD_ELIMINATION) {
    index = i + 1;
    while (index < M && A[index][i] == 0) index++;
    if (index < M) return swap_rows(i, index, Q, A);
  } else {
    index = i - 1;
    while (index >= 0 && A[index][i] == 0) index--;
    if (index >= 0) return swap_rows(i, index, Q, A);
  }

  return row_op;
};

const swap_rows = (i: number, index: number, Q: number, A: Matrix): number => {
  let temp: any;
  for (let p = 0; p < Q; p++) {
    temp = A[i][p];
    A[i][p] = A[index][p];
    A[index][p] = temp;
  }
  return 1;
};

const determine_rank = (m: number, M: number, Q: number, A: Matrix): number => {
  /* DETERMINE RANK, THAT IS, COUNT THE NUMBER OF NONZERO ROWS */
  let rank = m;
  let allZeroes: number;
  for (let i = 0; i < M; i++) {
    allZeroes = 1;
    for (let j = 0; j < Q; j++) {
      if (A[i][j] == 1) {
        allZeroes = 0;
        break;
      }
    }
    if (allZeroes == 1) rank--;
  }

  return rank;
};
