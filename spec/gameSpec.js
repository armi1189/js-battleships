describe('Game', function(){
  describe('when created', function(){
      
    beforeEach(function(){
      game = new Game();
      player1 = jasmine.createSpyObj('player1', ['name']);
      player2 = jasmine.createSpyObj('player2', ['name']);
      player1.name = "Bob";
      player2.name = "John";
    });

    it('can add a player',function(){
      game.addPlayer(player1)
      expect(game.player1.name).toEqual("Bob")
    });

    it('can add a second player', function(){
      game.addPlayer(player1);
      game.addPlayer(player2);
      expect(game.player1.name).toEqual("Bob")
      expect(game.player2.name).toEqual("John")
    });

    it('cannot add more than 2 players', function(){
      player3 = jasmine.createSpyObj('player3', ['name']);
      game.addPlayer(player1);
      game.addPlayer(player2);
      expect(function(){ game.addPlayer(player3); }).toThrow(new Error('Players already defined'));
    });

    it('knows who\'s turn it is', function(){
      game.addPlayer(player1);
      expect(game.turn).toEqual(player1);
    })

  })

  describe('when there are two players', function(){

    beforeEach(function(){
      game = new Game();
      player1 = jasmine.createSpyObj('player1', ['name', 'ready', 'lost']);
      player2 = jasmine.createSpyObj('player2', ['name', 'ready', 'registerShot', 'lost']);
      player1.name = "Bob";
      player2.name = "John";
      game.addPlayer(player1);
      game.addPlayer(player2);
      player1.ready.and.callFake(function() {
        return true
      });
      player2.ready.and.callFake(function() {
        return true
      });
      player2.lost.and.callFake(function() {
        return false
      });
    });

    it("knows who the opponent is", function(){
      expect(game.opponent()).toEqual(player2);
    });

    it('can switch turns', function(){
      game.switchTurn();
      expect(game.turn).toEqual(player2);
    });

    it('knows who the opponent is after the turn has been switched', function(){
      game.switchTurn();
      expect(game.opponent()).toEqual(player1);
    });

    it('knows if the game is ready', function(){
      expect(game.ready()).toBe(true);
    });

    it('knows if the game is not ready when player 2 isn\'t', function(){
      player2.ready.and.callFake(function() {
        return false
      });
      expect(game.ready()).toBe(false);
    });

    it('knows if the game is not ready when player 1 isn\'t', function(){
      player1.ready.and.callFake(function() {
        return false
      });
      expect(game.ready()).toBe(false);
    });

    it('switch turns after a move has been made', function(){
      game.makeMove("A1");
      expect(game.turn).toEqual(player2)
    });

    it('knows if the game is not over', function(){
      expect(game.over()).toBe(false)
    })

    it('knows if the game is over', function(){
      player2.lost.and.callFake(function() {
        return true
      });
      expect(game.over()).toBe(true)
    })

  });
});