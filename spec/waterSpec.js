describe('Water', function(){
  describe('when created', function(){
    
    var water = new Water();

    it('is not hit', function(){
      expect(water.isHit).toBe(false)
    })
  })
  describe('after been hit', function(){
    
    var water = new Water();

    it('is not hit', function(){
      water.hit();
      expect(water.isHit).toBe(true)
    })
  })
})