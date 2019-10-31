// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      //iterate through the rowIndex array
      var row = this.get(rowIndex);
      var count = 0;

      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }
      }

      if (count < 2) {
        return false;
      } else {
        return true;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // if hasRowConflictAt run on any column is true
      var result = false;
      for (var i = 0; i < this.get('n'); i++) {

        if (this.hasRowConflictAt(i)) {
          result = true;
        }
      }
      return result;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // given a column index
      // define what the column index is and push to an array
      // column index 0 = each array's [0] element
      // column index 1 = each array's [1] element
      var array = [];
      //declare a count variable
      var count = 0;
      for (var i = 0; i < this.get('n'); i++) {
        var element = this.get(i)[colIndex];
        array.push(element);
      }

      for (var k = 0; k < array.length; k++) {
        if (array[k] === 1) {
          count++;
        }
      }
      // iterate the result array
      // count increases if there's a one at the column
      // if there's a count >= 2 then return true
      // else return false
      if (count >= 2) {
        return true;
      } else {
        return false;
      }

    },
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var result = false;
      // need to get each column
      // iterate each column



      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          result = true;
        }
      }
      return result;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (colIndex) {

      // create a place to hold all the result of colIndex
      var array = [];
      var count = 0;
      var i = 0;
      // if colindex is less than 0, convert it an absolute number
      if (colIndex < 0) {
        colIndex = Math.abs(colIndex);
        i = colIndex;
        colIndex = 0;
      }

      // iterating the whole board
      for (i; i < this.get('n'); i++) {
        var element = this.get(i)[colIndex];
        array.push(element);
        colIndex++;
        //if statement to break the for loop if index is the same as the length
        if (colIndex === this.get('n')) {
          break;
        }
      }
      //iterate the array and count how many times 1 showed up
      for (var k = 0; k < array.length; k++) {
        if (array[k] === 1) {
          count++;
        }
      }
      if (count >= 2) {
        return true;
      } else {
        return false;
      }
      // given the column index, locate the element in each column
      // afte the next element, go to the next column & ++ column index

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      //iterate all the element in the array
      result = false;
      // have to provide colIndex, a negative or positive number

      var i = (this.get('n') - 1) * -1;
      for (i; i < this.get('n'); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (colIndex) {
      // create a place to hold all the result of colIndex
      var array = [];
      var count = 0;
      var i = 0;

      // if colindex is less than 0, convert it an absolute number
      if (colIndex >  this.get('n')-1) {
        i = colIndex-this.get('n')+1;
        colIndex = this.get('n')-1;
      }
      // iterating the whole board
      for (i; i < this.get('n'); i++) {
        var element = this.get(i)[colIndex];
        array.push(element);
        colIndex--;
        //if statement to break the for loop if index is the same as the length
        if (colIndex < 0 ) {
          break;
        }
      }

      for (var k = 0; k < array.length; k++) {
        if (array[k] === 1) {
          count++;
        }
      }
      if (count >= 2) {
        return true;
      } else {
        return false;
      }

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      //iterate all the element in the array
      result = false;
      // have to provide colIndex, a negative or positive number


      for (i = 0 ; i <= (this.get('n')-1) *2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;


    }



  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
