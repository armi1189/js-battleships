$(document).ready(function(){
  function getGames(){
    $.getJSON('/get_games', function(data){
      $('#games').html(''); 
      $.each(data, function(index, value) {
        $('#games').append('<div>' + value.player1.username + '\
                              <form action="/join_game" method="post">\
                                <input name="opponent_id" type="hidden" value="' + value.player1.id + '">\
                                <button type="submit">Join</button>\
                              </form>\
                            </div>') 
      }); 
    });
  }
  setInterval(function(){getGames()}, 1000);
});
