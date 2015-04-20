function Game() {

};

Game.prototype.addPlayer = function(player) {
  if (this.player1 && this.player2) throw new Error('Players already defined');
  else if (this.player1) this.player2 = player;
  else this.player1 = player; this.turn = this.player1;
};

Game.prototype.opponent = function() {
  if (this.turn == this.player1) return this.player2;
  return this.player1;
};

Game.prototype.switchTurn = function() {
  if (this.turn == this.player1) this.turn = this.player2;
  else this.turn = this.player1;
};

Game.prototype.ready = function() {
  if (this.player1.ready() && this.player2.ready()) return true;
  else return false;
};

Game.prototype.makeMove = function(cell) {
  this.opponent().registerShot(cell);
  this.switchTurn();
};

Game.prototype.over = function() {
  if (this.opponent().lost()) return true;
  else return false;
};