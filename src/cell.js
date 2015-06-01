function Cell(){
  this.content = new Water();
  this.isHit = false;
};

Cell.prototype.hit = function() {
  if (this.isHit) throw new Error('Cell already hit');
  this.content.hit();
  this.isHit = true;
};