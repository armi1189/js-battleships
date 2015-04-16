describe('Ship when is created', function(){
  
  var ship = new Ship();

  it('has a default size of 2', function(){
    expect(ship.size).toEqual(2);
  });

  it('can have a variable size', function(){
    var bigShip = new Ship(5);
    expect(bigShip.size).toEqual(5);
  });

  it('is not sunk', function(){
    expect(ship.sunk).not.toBe(true);
  });

});

describe('Ship after been created', function(){

  beforeEach(function(){  
    ship = new Ship();
  });

  it('can be hit', function(){
    ship.hit();
    expect(ship.hitCount).toEqual(1);
  });

  it('can be sunk', function(){
    for (var hits=0; hits <= ship.size; hits++) ship.hit();
    expect(ship.sunk).toBe(true);
  });

});
