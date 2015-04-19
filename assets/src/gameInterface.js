$(document).ready(function(){
  
  game = new Game();
  player1 = new Player("Bob");
  player2 = new Player("John");
  game.addPlayer(player1);
  game.addPlayer(player2);
  board1 = new Board(10, 5);
  board2 = new Board(10, 5);
  player1.board = board1;
  player2.board = board2;

$.each(player1.board.grid, function( index, value ) {
  $('.player_one_grid').append('<div id="P1_' + index + '" class="cell"></div>'); 
});

});