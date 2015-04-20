class SocialBattleShips < Sinatra::Base

   post '/post_board' do

    user = User.first(id: session[:user_id])
    game = Game.first(player1: user) || Game.first(player2: user)
    game.update(player1_grid: params['dataP1'],
                player2_grid: params['dataP2'])

  end

  post '/update_board' do
    user = User.first(id: session[:user_id])
    game = Game.first(player1: user) || Game.first(player2: user)
    if game.player1_id == session[:user_id]
      game.update(player1_grid: params['data'])
    else
      game.update(player2_grid: params['data'])
    end
  end

  get '/get_board_P1' do
    user = User.first(id: session[:user_id])
    game = Game.first(player1: user) || Game.first(player2: user)
    (game.player1_grid).to_json
  end

  get '/get_board_P2' do
    user = User.first(id: session[:user_id])
    game = Game.first(player1: user) || Game.first(player2: user)
    (game.player2_grid).to_json
  end

end
