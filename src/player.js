function Player(name){
  this.name = name;
};

Player.prototype.hasBoard = function() {
  if (this.board) return true;
  return false;
};

Player.prototype.ready = function() {
  return (this.board && this.board.ready())
};

Player.prototype.lost = function() {
  return this.board.checkSunk();
}