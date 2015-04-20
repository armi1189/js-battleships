class SocialBattleShips < Sinatra::Base 

  get '/game' do
    user = User.first(id: session[:user_id])
    @game = Game.first(player1: user) || Game.first(player2: user)
    erb :game
  end

end