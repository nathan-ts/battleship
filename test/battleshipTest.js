const assert = require('chai').assert;
const { Battleship } = require('../battleship');

// Tests

describe("Create Valid Battleships", function() {
  it("returns a valid battleship at bottom right, vertical", function() {
    let carrier = new Battleship("Carrier", ["A",6], 5, "V");
    assert.isTrue(carrier.isValid());
    assert.equal(carrier.start, "A6");
    assert.equal(carrier.end, "A10");
    assert.deepEqual(carrier.points, [[65,6],[65,7],[65,8],[65,9],[65,10]])
  });
  it("returns a valid battleship at top left, horizontal", function() {
    let cruiser = new Battleship("Cruiser", ["H",1], 3, "H");
    assert.isTrue(cruiser.isValid());
    assert.equal(cruiser.start, "H1");
    assert.equal(cruiser.end, "J1");
  });
});

describe("Create Invalid Battleships", function() {
  it("returns an invalid battleship at bottom right, vertical", function() {
    let carrier = new Battleship("Carrier", ["A",7], 5, "V");
    assert.isFalse(carrier.isValid());
  });
  it("returns a valid battleship at top left, horizontal", function() {
    let cruiser = new Battleship("Cruiser", ["I",1], 3, "H");
    assert.isFalse(cruiser.isValid());
  });
});