
const MATRIX_FORWARD_ELIMINATION = 0;
const MATRIX_BACKWARD_ELIMINATION = 1;

// const print_matrix = (matrix) => {
//   var i, line, astr, ch;
//   for (i = 0; i < len(matrix.length; i++) {
//     line = matrix[i];
//     if (i === 0) {
//       astr = "[" + str(line) + " : ";
//     } else {
//       astr += " " + str(line) + " : ";
//     }

//     for (index = 0; index < line.length; index++) {
//       ch = line[index];
//       astr = astr + str(ch);
//     }
//     if (i === len(matrix) - 1) {
//       astr += "]";
//     } else {
//       astr = astr + "\n";
//     }
//   }
// }

function row_echelon(M, Q, matrix, blknum) {
  var ՐՏupk1, ՐՏupk2;
  var lm, pivotstartrow, pivotstartcol, i, found, k, pivotrow, j, x, y;
  lm = copy.deepcopy(matrix);
  pivotstartrow = 0;
  pivotstartcol = 0;
  for (i = 0; i < Q; i++) {
    found = false;
    for (k = pivotstartrow; k < Q; k++) {
      if (lm[k][pivotstartcol] === 1) {
        found = true;
        pivotrow = k;
        break;
      }
    }
    if (found) {
      if (pivotrow !== pivotstartrow) {
        ՐՏupk1 = [lm[pivotstartrow], lm[pivotrow]];
        lm[pivotrow] = ՐՏupk1[0];
        lm[pivotstartrow] = ՐՏupk1[1];
      }
      for (j = pivotstartrow + 1; j < Q; j++) {
        if (lm[j][pivotstartcol] === 1) {
          lm[j] = (function () {
            var ՐՏidx2, ՐՏitr2 = ՐՏ_Iterable(zip(lm[pivotstartrow], lm[j])), ՐՏres = [], x, y;
            for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
              ՐՏupk2 = ՐՏitr2[ՐՏidx2];
              x = ՐՏupk2[0];
              y = ՐՏupk2[1];
              ՐՏres.push(x ^ y);
            }
            return ՐՏres;
          })();
        }
      }
      ++pivotstartcol;
      ++pivotstartrow;
    } else {
      ++pivotstartcol;
    }
  }
  return lm;
}
function rank(M, Q, matrix, blknum) {
  var ՐՏitr3, ՐՏidx3;
  var lm, rank, i, nonzero, bit;
  lm = row_echelon(M, Q, matrix, blknum);
  rank = 0;
  for (i = 0; i < Q; i++) {
    nonzero = false;
    ՐՏitr3 = ՐՏ_Iterable(lm[i]);
    for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
      bit = ՐՏitr3[ՐՏidx3];
      if (bit === 1) {
        nonzero = true;
      }
    }
    if (nonzero) {
      ++rank;
    }
  }
  return rank;
}
function computeRank(M, Q, matrix) {
  var ՐՏupk3, ՐՏitr4, ՐՏidx4, ՐՏupk4;
  var m, localmatrix, i, row_op, rank;
  m = min(M, Q);
  localmatrix = copy.deepcopy(matrix);
  for (i = 0; i < m - 1; i++) {
    if (localmatrix[i][i] === 1) {
      localmatrix = perform_elementary_row_operations(MATRIX_FORWARD_ELIMINATION, i, M, Q, localmatrix);
    } else {
      ՐՏupk3 = find_unit_element_and_swap(MATRIX_FORWARD_ELIMINATION, i, M, Q, localmatrix);
      row_op = ՐՏupk3[0];
      localmatrix = ՐՏupk3[1];
      if (row_op === 1) {
        localmatrix = perform_elementary_row_operations(MATRIX_FORWARD_ELIMINATION, i, M, Q, localmatrix);
      }
    }
  }
  ՐՏitr4 = ՐՏ_Iterable(range(m - 1, 0, -1));
  for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
    i = ՐՏitr4[ՐՏidx4];
    if (localmatrix[i][i] === 1) {
      localmatrix = perform_elementary_row_operations(MATRIX_BACKWARD_ELIMINATION, i, M, Q, localmatrix);
    } else {
      ՐՏupk4 = find_unit_element_and_swap(MATRIX_BACKWARD_ELIMINATION, i, M, Q, localmatrix);
      row_op = ՐՏupk4[0];
      localmatrix = ՐՏupk4[1];
      if (row_op === 1) {
        localmatrix = perform_elementary_row_operations(MATRIX_BACKWARD_ELIMINATION, i, M, Q, localmatrix);
      }
    }
  }
  rank = determine_rank(m, M, Q, localmatrix);
  return rank;
}
function perform_elementary_row_operations(flag, i, M, Q, A) {
  var ՐՏitr5, ՐՏidx5;
  var j, k;
  j = 0;
  k = 0;
  if (flag === MATRIX_FORWARD_ELIMINATION) {
    for (j = i + 1; j < M; j++) {
      if (A[j][i] === 1) {
        for (k = i; k < Q; k++) {
          A[j][k] = (A[j][k] + A[i][k]) % 2;
        }
      }
    }
  } else {
    ՐՏitr5 = ՐՏ_Iterable(range(i - 1, -1, -1));
    for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
      j = ՐՏitr5[ՐՏidx5];
      if (A[j][i] === 1) {
        for (k = 0; k < Q; k++) {
          A[j][k] = (A[j][k] + A[i][k]) % 2;
        }
      }
    }
  }
  return A;
}
function find_unit_element_and_swap(flag, i, M, Q, A) {
  var index, row_op;
  index = 0;
  row_op = 0;
  if (flag === MATRIX_FORWARD_ELIMINATION) {
    index = i + 1;
    while (index < M && A[index][i] === 0) {
      ++index;
      if (index < M) {
        row_op = 1;
        A = swap_rows(i, index, Q, A);
      }
    }
  } else {
    index = i - 1;
    while (index >= 0 && A[index][i] === 0) {
      index = index - 1;
      if (index >= 0) {
        row_op = 1;
        A = swap_rows(i, index, Q, A);
      }
    }
  }
  return [row_op, A];
}
function swap_rows(i, index, Q, A) {
  var ՐՏupk5;
  ՐՏupk5 = [A[index], A[i]];
  A[i] = ՐՏupk5[0];
  A[index] = ՐՏupk5[1];
  return A;
}
function determine_rank(m, M, Q, A) {
  var i, j, rank, allZeroes;
  i = 0;
  j = 0;
  rank = 0;
  allZeroes = 0;
  rank = m;
  for (i = 0; i < M; i++) {
    allZeroes = 1;
    for (j = 0; j < Q; j++) {
      if (A[i][j] === 1) {
        allZeroes = 0;
      }
    }
    if (allZeroes === 1) {
      --rank;
    }
  }
  return rank;
}
function create_matrix(M, Q) {
  var matrix, rownum, x, row;
  matrix = list();
  for (rownum = 0; rownum < Q; rownum++) {
    row = (function () {
      var ՐՏidx6, ՐՏitr6 = ՐՏ_Iterable(range(M)), ՐՏres = [], x;
      for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
        x = ՐՏitr6[ՐՏidx6];
        ՐՏres.push(0);
      }
      return ՐՏres;
    })();
    matrix.append(row);
  }
  return matrix;
}
function matrix_from_bits(M, Q, bits, blknum) {
  var m, rownum, row;
  m = list();
  for (rownum = 0; rownum < Q; rownum++) {
    row = bits.slice(rownum * M, (rownum + 1) * M);
    m.append(row);
  }
  return m.slice(0);
}
