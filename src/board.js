
function Board(size){
  this.grid = {};
  this.generateGrid(size || 2);
}

Board.prototype.generateGrid = function(size) {
  for(var x=1; x <= size; x++){
    this.grid[String.fromCharCode(64 + x)] = {};
    for(var y=1; y <= size; y++){
      this.grid[String.fromCharCode(64 + x)][y] = new Cell();
    };
  };
};

Board.prototype.place = function(ship, coordX, coordY, orient) {
  var coord = getCoords(ship.size, coordX, coordY, orient);
  for(i=0; i < coord.length; i++) {
    if (horizontal(orient)) this.grid[coordX][coord[i]].content = ship;
    else this.grid[coord[i]][coordY].content = ship;
  };
};

function horizontal(orient){
  return orient === "horizontal";
};

function getCoords(shipSize, coordX, coordY, orient) {
  var coords = [];
  if (horizontal(orient)) {
    for(i=0; i<shipSize; i++) coords.push(coordY + i);
  } else {
    for(i=0; i<shipSize; i++) coords.push(String.fromCharCode(coordX.charCodeAt(0) + i));
  }
  return coords
};
