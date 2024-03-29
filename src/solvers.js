/*           _
  ___  ___ | |_   _____ _ __ ___
 / __|/ _ \| \ \ / / _ \ '__/ __|
 \__ \ (_) | |\ V /  __/ |  \__ \
 |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  // var solution = undefined; //fixme
  var solution = [];
  for (var i = 0; i < n; i++) {
    var arr = new Array(n);
    arr.map(function (value, index, arr) {
      arr[index] = 0;
    });
    arr[i] = 1;
    solution.push(arr);
  }
  // return chessBoard;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme
  //base case: n = 1, return 1
  //create an arr of arrays that's n x n, initialized to 0
  //var solutionCount =0
  //loop through n, take the first row, add a rook at arr[i]
  //solutionCount += recursively call function on n-1
  var factorial = function (num) {
    if (num === 1) {
      return 1;
    }
    return num * factorial(num - 1);
  };
  solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = [];
  var boardSolution = new Board({n:n});
  if (n === 0) {
    return [];
  }

  var board = new Board({ n: n });
  var solutionCount = 0;
  var recursive = function (board, row) {
    if (row === board.get('n')) {
      solutionCount++;
      boardSolution = board;
      return;
    }
    for (var i = 0; i < board.get('n'); i++) {
      board.get(row)[i] = 1;
      if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
        recursive(board, row + 1);
        if (solutionCount === 1) {
          break;
        }
      }
      board.get(row)[i] = 0;
    }
    return;
  };
  recursive(board, 0);

  for (var i = 0; i < boardSolution.get('n'); i++) {
    solution.push(boardSolution.get(i));
  }


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  if (n === 0) {
    return 1;
  }
  var board = new Board({ n: n });
  var recursive = function (board, row) {
    if (row === board.get('n')) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < board.get('n'); i++) {
      board.get(row)[i] = 1;
      if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
        recursive(board, row + 1);
      }
      board.get(row)[i] = 0;
    }
    return;
  };
  recursive(board, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
