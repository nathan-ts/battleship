class Battleship {
  // accepts (String, [Char='A'-'J', Int=1-10], Int=2-5, Char='H','V')
  constructor(name, startPoint, length, orientation) {
    this.errorLevel = 0;
    this.valid = false;
    try {
      this.name = name;
      this.dir = orientation;
      this.length = length;
      this.startX = startPoint[0].charCodeAt();
      this.startY = startPoint[1],
      this.endX = this.startX + (this.dir === "H" ? this.length -1 : 0);
      this.endY = this.startY + (this.dir === "V" ? this.length - 1: 0);
    } catch (err) {
      console.log("Invalid data entered, please try again");
      this.valid = false;
      this.errorLevel = 1; // errorLevel 1: invalid type of battleship creation data
    }
    if (!this.errorLevel && this.isValid()) this.valid = true;
    if (this.valid) {
      this.points = this.getAllPoints();
    }
  }

  isValid() {
    this.errorLevel = 1; // assumes errorLevel 1: invalid type of battleship creation data
    // Check if direction, length, or starting point are invalid
    if (this.dir !== "H" && this.dir !== "V") {
      console.log(`Error: Orientation ${this.dir} is not valid (H, V)`);
      return false;
    }
    if (this.length < 2 || this.length > 5) {
      console.log(`Error: Length of ${this.length} is not valid (2-5)`);
      return false;
    }
    if (this.startX < 65 || this.startX > 74) {
      console.log(`Error: Column ${String.fromCharCode(this.startX)} is not between 'A'-'J' (case sensitive)`);
      return false;
    }
    if (this.startY < 1 || this.startY > 10) {
      console.log(`Error: Row ${this.startY} is not between 1-10`);
      return false;
    }
    // Check if ending point is invalid for given length
    if (this.endX < 65 || this.endX > 74 || this.endY < 1 || this.endY > 10) { 
      console.log(`Error: ${this.name} is too close to the edge`);
      return false;
    }
    // All checks passed, return true
    console.log(`Your ${this.name} has been created from ${this.start} to ${this.end}`);
    this.errorLevel = 0; // no errorLevel since data passed checks
    return true;
  }

  get start() { // Readable start point coordinates
    return this.toPointString(this.startX, this.startY);
  }
  get end() { // Readable end point coordinates
    return this.toPointString(this.endX, this.endY);
  }

  toPointString(x, y) { // Returns a string of length 2-3
    return String.fromCharCode(x) + y;
  }

  toPointCoord(str) { // Returns an array of length 2
    return [str[0].charCodeAt(),parseInt(str[1])]; 
  }

  getAllPoints() {
    let allPoints = [];
    for (let i = 0; i < this.length; i++) {
      if (this.dir === "H") allPoints.push([this.startX + i, this.startY]);
      if (this.dir === "V") allPoints.push([this.startX, this.startY + i]);
    }
    return allPoints;
  }
}

module.exports = { Battleship };

/*
  ABCDEFGHIJ
1
2
3
4
5
6
7
8
9
10
*/