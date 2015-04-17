describe('Board when is created', function(){

  var board = new Board();

  it('has a default size of 2', function(){
    expect(Object.keys(board.grid).length).toEqual(2);
  });

  it('can have a variable size', function(){
    board = new Board(10)
    expect(Object.keys(board.grid).length).toEqual(10);
  });

})
 
describe('Board after been created', function(){

  beforeEach(function(){
    board = new Board();
    ship = jasmine.createSpyObj('ship', ['size', 'hit', 'hitCount']);
    first_cell = jasmine.createSpyObj('first_cell', ['content']);
    second_cell = jasmine.createSpyObj( 'second_cell', ['content']);
    ship.size = 2;
  });

  it('can place a ship horizontally', function(){
    board.grid["A"][1] = first_cell
    board.grid["A"][2] = second_cell
    board.place(ship, "A", 1, "horizontal")
    expect(board.grid["A"][2].content).toEqual(ship) 
  });

  it('can place a ship vertically', function(){
    board.grid["A"][1] = first_cell
    board.grid["B"][1] = second_cell
    board.place(ship, "A", 1, "vertical")
    expect(board.grid["B"][1].content).toEqual(ship) 
  });
});  


// can work out the coordinates
// know if a coord is on the board
// cannot overlay ships
// cannot place ships out of bounds
// can bomb coord
// cannot bomb coord out bounds
// knows if all ships are sunk
// knows if there are floating ships

// it can fill all cells with water