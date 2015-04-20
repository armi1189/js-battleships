function gameSetup(player1_name, player2_name) {
  game = new Game();
  player1 = new Player(player1_name);
  player2 = new Player(player2_name);
  board1 = new Board(10, 5);
  board2 = new Board(10, 5);
  player1.board = board1;
  player2.board = board2;
  game.addPlayer(player1);
  game.addPlayer(player2);

  ship = new Ship();
}
