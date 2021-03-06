describe('Player', function(){
  describe('when created', function(){

    var player = new Player('Bob');

    it('can have a name',function(){
      expect(player.name).toEqual('Bob')
    });

    it('can know that he has no board', function(){
      expect(player.hasBoard()).toBe(false);
    })

    it('can have a board',function(){
      player.board = 'board'
      expect(player.board).toEqual('board')
    });

  });

  describe('with a board', function(){

    beforeEach(function(){
      player = new Player('Bob');
      board = jasmine.createSpyObj('board', ['ready']);
      player.board = board;
    });

    it('can know if it has a board',function(){
      expect(player.hasBoard()).toBe(true);
    });

    it('know if the board is ready',function(){
      board.ready.and.callFake(function() {
        return true
      });
      expect(player.ready()).toBe(true);
    });

  });

  describe('with a ready board', function(){

     beforeEach(function(){
      player = new Player('Bob');
      board = jasmine.createSpyObj('board', ['checkSunk', 'bomb']);
      player.board = board;
      board.checkSunk.and.callFake(function() {
        return false
      });
    });

    it('can register shots', function(){
      board.bomb.and.callFake(function() {
        return true
      });
      expect(player.registerShot("A1")).toBe(true)
    })

    it('know if he hasn\'t lost',function(){
      expect(player.lost()).toBe(false);
    });

    it('know if he has lost',function(){
      board.checkSunk.and.callFake(function() {
        return true
      });
      expect(player.lost()).toBe(true);
    });
  });
});