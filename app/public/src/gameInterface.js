$(document).ready(function(){

position = $('#vert_hor_switch').attr('data-position');
$('#vert_hor').append(position);

$('#vert_hor_switch').click(function(){
  if (position !== 'horizontal'){
    $(this).attr('data-position', 'horizontal');
    position = $(this).attr('data-position')
    $('#vert_hor').html(position);
  } else {
    $(this).attr('data-position', 'vertical');
    position = $(this).attr('data-position')
    $('#vert_hor').html(position);
  }
});


function updateGrid(){
  $.ajax({
      type: "get",
      url: "/get_board_P1",
      dataType: "json",
      success:function(data) {
        data = JSON.parse(data);
        player1.board.grid = data;
        $('.player_one_grid').html('');
        $.each(player1.board.grid, function( index, value ) {
          /// if value include size: ship
          if (value.content.size){
            $('.player_one_grid').append('<div data-coord="' + index + '" class="cell P1 full"></div>');
          } else {
            $('.player_one_grid').append('<div data-coord="' + index + '" class="cell P1"></div>');
          } 
        });
        $('.P1').click(function(){
          coord = $(this).attr('data-coord');
          position = $('#vert_hor_switch').attr('data-position');
          player1.board.place(ship, coord, position);
          data = JSON.stringify(player1.board.grid)
          $.post('/update_board', { data: data })
        })
      }
  });

  $.ajax({
      type: "get",
      url: "/get_board_P2",
      dataType: "json",
      success:function(data) {
        data = JSON.parse(data);
        player2.board.grid = data;
        $('.player_two_grid').html('');
        $.each(player2.board.grid, function( index, value ) {
          if (value.content.size){
            $('.player_two_grid').append('<div data-coord="' + index + '" class="cell P2 full"></div>');
          } else {
            $('.player_two_grid').append('<div data-coord="' + index + '" class="cell P2"></div>');
          }
        });
        $('.P2').click(function(){
          coord = $(this).attr('data-coord');
          position = $('#vert_hor_switch').attr('data-position');
          player2.board.place(ship, coord, position);
          data = JSON.stringify(player2.board.grid)
          $.post('/update_board', { data: data })
        })
      }
  });
}

setInterval(function(){updateGrid()}, 1000);



});