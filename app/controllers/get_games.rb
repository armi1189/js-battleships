class SocialBattleShips < Sinatra::Base
   get '/get_games' do
    (Game.all(conditions: ['player1_id = player2_id'])).to_json(methods: [:player1])
  end
end