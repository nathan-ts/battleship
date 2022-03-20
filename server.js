class Battleship {

  constructor(name, startPoint, length, orientation) {
    this.name = name;
    [ this.startX, this.startY ] = startPoint;
    this.length = length;
    this.dir = orientation;
    this.valid = this.isValid() ? true : false;
  }

  isValid() {
    console.log(this.startX.charCodeAt(), this.startY)
    // Check if direction or starting point are invalid
    if (this.dir !== "H" && this.dir !== "V") {
      console.log(`Error: Orientation ${this.dir} is not valid (H, V)`);
      return false;
    }
    if (this.startX.charCodeAt() < 65 || this.startX.charCodeAt() > 74) {
      console.log(`Error: Column ${this.startX} is not between A, J`);
      return false;
    }
    if (this.startY < 1 || this.startY > 10) {
      console.log(`Error: Row ${this.startY} is not between 1-10`);
      return false;
    }
    // Check if ending point is invalid
    let endX = this.startX.charCodeAt() + (this.dir === "H" ? this.length -1 : 0);
    let endY = this.startY + (this.dir === "V" ? this.length - 1: 0);
    console.log(endX, endY);
    if (endX < 65 || endX > 74 || endY < 1 || endY > 10) { 
      console.log(`Error: ${this.length} is an invalid length`);
      return false;
    }
    // All checks passed, return true
    console.log(`Your ${this.name} has been created from ${this.startX}${this.startY} to ${String.fromCharCode(endX)}${endY}`);
    return true;
  }

  // get start() {

  // }

}

let cruiser = new Battleship("Cruiser", ["A",1], 3, "H");
console.log(cruiser);


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