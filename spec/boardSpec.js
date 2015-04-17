describe('Board when is created', function(){

  var board = new Board();

  it('has a default size of 2', function(){
    expect(Object.keys(board.grid).length).toEqual(4);
  });

  it('can have a variable size', function(){
    board = new Board(10)
    expect(Object.keys(board.grid).length).toEqual(100);
  });

})
 
describe('Board after been created', function(){

  beforeEach(function(){
    board = new Board();
    ship = jasmine.createSpyObj('ship', ['size', 'hit', 'hitCount']);
    first_cell = jasmine.createSpyObj('first_cell', ['hit', 'content']);
    second_cell = jasmine.createSpyObj( 'second_cell', ['hit', 'content']);
    ship.size = 2;
    first_cell.content = "";
    second_cell.content = "";
  });

  it('can work out the horizontal coordinates for a size', function(){
    expect(getCoords(ship.size, "A1", "horizontal")).toEqual(["A1","A2"]);
  });

  it('can work out the vertical coordinates for a size', function(){
    expect(getCoords(ship.size, "A1", "vertical")).toEqual(["A1","B1"]);
  });

  it('can place a ship horizontally', function(){
    board.grid["A1"] = first_cell
    board.grid["A2"] = second_cell
    board.place(ship, "A1", "horizontal")
    expect(board.grid["A2"].content).toEqual(ship) 
  });

  it('can place a ship vertically', function(){
    board.grid["A1"] = first_cell
    board.grid["B1"] = second_cell
    console.log(board.grid["A1"])
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
    board.grid["A1"] = first_cell
    board.grid["A2"] = second_cell
    board.place(ship, "A1", "horizontal")
    expect(function(){ board.place(ship, "A1", "vertical"); }).toThrow(new Error('Can\'t place a ship there'))
  });

  it('can\'t place a ship outside of the bounderies', function(){
    expect(function(){ board.place(ship, "A2", "horizontal"); }).toThrow(new Error('Can\'t place a ship there'))
  });

  it('can hit items on the board', function(){
    board.grid["A1"] = first_cell
    board.grid["A2"] = second_cell
    board.place(ship, "A1", "horizontal");
    board.bomb("A1")
    expect(board.grid["A1"].isHit).toBe(true);
    expect(board.grid["A1"].content.hitCount).toEqual(1);
  });

  it('can\'t hit a cell outside of the bounderies', function(){
    expect(function(){ board.bomb("A3"); }).toThrow(new Error('Cell out of bounds'));
  });

  it('knows that all ships are sunk', function(){
    board.grid["A1"] = first_cell
    board.grid["A2"] = second_cell
    board.place(ship, "A1", "horizontal");
    board.bomb("A1");
    board.bomb("A2");
    expect(board.checkSunk).toBe(true);
  });

  it('knows if there are any floating ships', function(){
    board.place(ship, "A1", "horizontal");
    expect(board.checkSunk).toBe(false);
  });

  // it('can fill all the content with water', function(){

  // });
});  

