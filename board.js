const { Battleship } = require('./battleship');

class Board {

  /*  grid of A-J, [0-9] contains: 
        0:  🔳 empty sea, not shot at
        1:  🚫 empty sea, shot and missed
        10: 🚢 player battleship, not shot at 
        11: 💣 player battleship, shot and hit
  */
  constructor() {
    this.grid = {};
    for (let i = 65; i <= 74; i++) {
      this.grid[String.fromCharCode(i)] = new Array(10).fill(0);
    }
    this.ships = [];
    this.history = [];
  }

  // Takes a two character string and returns true if the point is on the grid, and false otherwise. 
  isValidShot(pt) { // Accepts 'A0' to 'J9', column offset by 1
    if (pt.length !== 2) return false;
    let row = pt[0];
    let col = parseInt(pt[1]);
    if (row.charCodeAt() < 65 || row.charCodeAt() > 74) return false;
    if (col < 0 || col > 9) return false;
    return true;
  }

  // Takes a valid point to shoot at, and takes a shot.
  // Modifies this.grid and returns true if the point has not been shot at yet (miss: 0->1, hit: 10-> 11). 
  // Does not modify this.grid and returns false if the point has already been shot at (1, 11). 
  myShot(pt) { // Accepts 'A0' to 'J9', column offset by 1
    if (this.isValidShot(pt)) {
      let row = pt[0];
      let col = parseInt(pt[1]);
      if (!(this.grid[row][col] % 10)) {
        this.grid[row][col] += 1;
        this.history.push(pt);
        return true;
      }
      return false;
    }
    return false;
  }

  // Adds coordinates of a Battleship into the board as 🚢
  addShip(ship) {
    // console.log(ship);
    this.ships.push(ship);
    for (let pt of ship.points) {
      let row = String.fromCharCode(pt[0]);
      let col = pt[1] - 1;
      console.log(row, col);
      this.grid[row][col] = 10;
    }
    return true;
    // TO DO: check overlap on existing ships, do not modify grid and return false if so
  }

  drawBoard(player) {
    process.stdout.write('=================================\n');
    process.stdout.write(`            Player ${player+1}\n`);
    process.stdout.write(`    `);
    for (let row in this.grid) {
      process.stdout.write(`${row}  `);
    }
    process.stdout.write(`\n`);
    for (let col = 0; col < 10; col++) {
      process.stdout.write(`${(col+1).toString().padStart(2,' ')}| `);
      for (let row in this.grid) {
        switch (this.grid[row][col]) {
          case 0: 
            process.stdout.write(`🔳 `);
            break;
          case 1: 
            process.stdout.write(`🚫 `);
            break;
          case 10: 
            if (!player) process.stdout.write(`🚢 `); // player = 0 is player1, show own ships
            else process.stdout.write(`🔳 `); // player = 1 is player2, hide ships
            break;
          case 11: 
            process.stdout.write(`💣 `);
            break;
        }
      }
      process.stdout.write(`\n`);
    }
  }

  gameOver() {
    for (let row in this.grid) {
      for (let col = 0; col < row.length; col++) {
        const val = this.grid[row][col];
        if (val === 10) return false; // if 🚢 left game is not over, return false
      }
    }
    return true;
  }

}

module.exports = { Board };

let board = new Board();
// console.log(board);
// console.log("A0", board.isValidShot("A0"));
// console.log("J9", board.isValidShot("J9"));
// console.log("K9", board.isValidShot("K9"));
// console.log("a8", board.isValidShot("a8"));
// console.log("A", board.isValidShot("A"));
// console.log("I88", board.isValidShot("I88"));

let cruiser = new Battleship("Cruiser", ["H",1], 3, "H");
board.addShip(cruiser);
console.log(board.myShot("A9"));
console.log(board.myShot("J0"));
board.drawBoard(0);
board.drawBoard(1);
console.log(board.myShot("H0"));
console.log(board.myShot("H1"));
console.log(board.myShot("I0"));
console.log("Game over?",board.gameOver());
board.drawBoard(0);
board.drawBoard(1);
console.log(board.history);