describe('Board when is created', function(){

  var board = new Board();

  it('has a default size of 2', function(){
    expect(Object.keys(board.grid).length).toEqual(4);
  });

  it('can have a variable size', function(){
    board = new Board(10)
    expect(Object.keys(board.grid).length).toEqual(100);
  });

  it('knows the board is not ready when 0 ships are on it', function(){
    expect(board.ready()).toBe(false)
  });

})
 
describe('Board after been created', function(){

  beforeEach(function(){
    board = new Board();
    ship = jasmine.createSpyObj('ship', ['size', 'hit', 'hitCount', 'sunk']);
    first_cell = jasmine.createSpyObj('first_cell', ['hit', 'isHit', 'content']);
    second_cell = jasmine.createSpyObj( 'second_cell', ['hit', 'isHit', 'content']);
    board.grid["A1"] = first_cell
    board.grid["A2"] = second_cell
    first_cell.content = "";
    second_cell.content = "";
    ship.size = 2;
    ship.sunk = false;
  });

  it('can work out the horizontal coordinates for a size', function(){
    expect(getCoords(ship.size, "A1", "horizontal")).toEqual(["A1","A2"]);
  });

  it('can work out the vertical coordinates for a size', function(){
    expect(getCoords(ship.size, "A1", "vertical")).toEqual(["A1","B1"]);
  });

  it('can place a ship horizontally', function(){
    board.place(ship, "A1", "horizontal")
    expect(board.grid["A2"].content).toEqual(ship) 
  });

  it('can place a ship vertically', function(){
    board.grid["B1"] = second_cell
    board.place(ship, "A1", "vertical")
    expect(board.grid["B1"].content).toEqual(ship) 
  });

  it('knows if a coordinate is on the board', function(){
    expect(board.checkCoord(["A1", "A2"])).toBe(true);
  });

  it('knows if a coordinate is not on the board', function(){
    expect(board.checkCoord(["A2", "A3"])).toBe(false);
  });

  it('cannot overlay ships', function(){
    board.place(ship, "A1", "horizontal")
    expect(function(){ board.place(ship, "A1", "vertical"); }).toThrow(new Error('Can\'t place a ship there'))
  });

  it('can\'t place a ship outside of the bounderies', function(){
    expect(function(){ board.place(ship, "A2", "horizontal"); }).toThrow(new Error('Can\'t place a ship there'))
  });

  it('can hit items on the board', function(){
    board.place(ship, "A1", "horizontal");
    first_cell.hit.and.callFake(function() {
      first_cell.isHit = true;
      first_cell.content.hitCount = 1;
    });
    board.bomb("A1")
    expect(board.grid["A1"].isHit).toBe(true);
    expect(board.grid["A1"].content.hitCount).toEqual(1);
  });

  it('can\'t hit a cell outside of the bounderies', function(){
    expect(function(){ board.bomb("A3"); }).toThrow(new Error('Can\'t bomb outside boundries'));
  });

  it('knows that all ships are sunk', function(){
    board.place(ship, "A1", "horizontal");
    first_cell.hit.and.callFake(function() {
      first_cell.isHit = true;
      first_cell.content.hitCount = 1;
    });
    second_cell.hit.and.callFake(function() {
      second_cell.isHit = true;
      second_cell.content.hitCount = 2;
      second_cell.content.sunk = true
    });
    board.bomb("A1");
    board.bomb("A2");
    expect(board.checkSunk()).toBe(true);
  });

  it('knows if there are any floating ships', function(){
    board.place(ship, "A1", "horizontal");
    expect(board.checkSunk()).toBe(false);
  });

  it('knows the number of pieces required', function(){
    expect(board.numberOfPieces).toEqual(1);
  });

  it('can count the ships that are placed', function(){
    board.place(ship, "A1", "horizontal");
    expect(board.shipsPlaced).toEqual(1);
  });

  it('knows the board is ready when required ship count ships are on it', function(){
    board.place(ship, "A1", "horizontal");
    expect(board.ready()).toBe(true);
  });

});  

