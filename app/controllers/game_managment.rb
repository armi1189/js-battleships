class SocialBattleShips < Sinatra::Base 

  post '/create_game' do
    Game.create(player1_id: session[:user_id],
                player2_id: session[:user_id])
    redirect to '/game'
  end

  post '/join_game' do
    game = Game.first(player1_id: params['opponent_id'])
    game.update(player2_id: session[:user_id])
    redirect to '/game'
  end

end