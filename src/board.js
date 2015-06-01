function Board(size, pieces){
  this.grid = {};
  this.generateGrid(size || 2);
  this.numberOfPieces = (pieces || 1);
  this.shipsPlaced = 0;
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
  this.shipsPlaced ++;
};


Board.prototype.checkCoord = function(coords){
  for (i=0; i < coords.length; i++){
    var gridKeys = Object.keys(this.grid)
    if (gridKeys.indexOf(coords[i]) < 0) return false;
    if (this.grid[coords[i]].content.size) return false;
  }
  return true
};

Board.prototype.bomb = function(coord){
  var gridKeys = Object.keys(this.grid)
  if (gridKeys.indexOf(coord) < 0) throw new Error('Can\'t bomb outside boundries');
  this.grid[coord].hit(); 
}

Board.prototype.checkSunk = function() {
  var gridKeys = Object.keys(this.grid);
  for (i=0; i < gridKeys.length; i++) {
    if (this.grid[gridKeys[i]].content.size) {
      if (!(this.grid[gridKeys[i]].content.sunk)) return false;
    }
  }
  return true
};

Board.prototype.ready = function() {
  return (this.numberOfPieces === this.shipsPlaced);
};

function horizontal(orient){
  return orient === "horizontal";
};

function getCoords(shipSize, coord, orient) {
  coord = coord.split("")
  var coords = [];
  if (horizontal(orient)) coords = getHorizontalCoords(shipSize, coord);
  else coords = getVerticalCoords(shipSize, coord);
  return coords
};

function getHorizontalCoords(shipSize, coord) {
  var coords = [];
  for(i=0; i<shipSize; i++) {
    var number = parseInt(coord[1]) + i;
    coords.push(coord[0].concat(number));
  }
  return coords;
}

function getVerticalCoords(shipSize,coord) {
  var coords = [];
  for(i=0; i<shipSize; i++) {
    var letter = String.fromCharCode(coord[0].charCodeAt(0) + i);
    coords.push(letter.concat(coord[1]));
  }
  return coords;
}