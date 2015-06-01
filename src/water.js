function Water(){
  this.isHit = false;
}

Water.prototype.hit = function(){
  this.isHit = true;
}