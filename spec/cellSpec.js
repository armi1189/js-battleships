describe('Cell when created', function(){

  var cell = new Cell();

  it('can have content', function(){
    cell.content = ship
    expect(cell.content).toEqual(ship);
  });

  it('is not hit', function(){
    expect(cell.isHit).toBe(false);
  });

  it('can be hit', function(){
    cell.hit();
    expect(cell.isHit).toBe(true);
  });
});

describe('Cell with content', function(){


  beforeEach(function(){
    cell = new Cell();
    ship = jasmine.createSpyObj('ship', ['hit', 'hitCount'])
    cell.content = ship
  });

  it ('can hit whatever is in the content', function(){
    ship.hit.and.callFake(function() {
      ship.hitCount = 1;
    });
    cell.hit();
    expect(cell.content.hitCount).toEqual(1);
  });

  it('throws an error if you try to hit it twice', function(){
    cell.hit()
    expect(function(){ cell.hit(); }).toThrow(new Error('Cell already hit'))
  });
});