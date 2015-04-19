function Ship(size){
  this.size = size || 2;
  this.hitCount = 0;
  this.sunk = false;
};

Ship.prototype.hit = function() {
  this.hitCount ++;
  if (this.hitCount === this.size) this.sunk = true;
};