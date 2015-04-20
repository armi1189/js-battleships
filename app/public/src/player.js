function Player(name){
  this.name = name;
};

Player.prototype.hasBoard = function() {
  if (this.board) return true;
  return false;
};

Player.prototype.ready = function() {
  return (this.hasBoard() && this.board.ready())
};

Player.prototype.registerShot = function(cell) {
  return this.board.bomb(cell);
};

Player.prototype.lost = function() {
  return this.board.checkSunk();
}