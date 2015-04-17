function Board(size){
  this.grid = {};
  this.generateGrid(size || 2);
}

Board.prototype.generateGrid = function(size) {
  for(var x=1; x <= size; x++){
    var letter = String.fromCharCode(64 + x)
    for(var y=1; y <= size; y++){
      this.grid[letter.concat(y)] = new Cell();
    };
  };
};

Board.prototype.place = function(ship, coord, orient) {
  var coord = getCoords(ship.size, coord, orient);
  if (!(this.checkCoord(coord))) throw new Error('Can\'t place a ship there');
  for(i=0; i < coord.length; i++) {
    this.grid[coord[i]].content = ship; 
  };
};

function horizontal(orient){
  return orient === "horizontal";
};

function getCoords(shipSize, coord, orient) {
  coord = coord.split("")
  var coords = [];
  if (horizontal(orient)) coords = getHorizontalCoords(shipSize, coord);
  else coords = getVerticalCoords(shipSize, coord);
  return coords
};

function getHorizontalCoords(shipSize, coord) {
  var coords = [];
  for(i=0; i<shipSize; i++) {
    var number = parseInt(coord[1]) + i;
    coords.push(coord[0].concat(number));
  }
  return coords;
}

function getVerticalCoords(shipSize,coord) {
  var coords = [];
  for(i=0; i<shipSize; i++) {
    var letter = String.fromCharCode(coord[0].charCodeAt(0) + i);
    coords.push(letter.concat(coord[1]));
  }
  return coords;
}

Board.prototype.checkCoord = function(coords){
  for (i=0; i < coords.length; i++){
    var gridKeys = Object.keys(this.grid)
    if (gridKeys.indexOf(coords[i]) < 0) return false;
    if (this.grid[coords[i]].content !== "") return false;
  }
  return true
};
