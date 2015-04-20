require 'sinatra/base'
require 'data_mapper'
require 'rack-flash'
require 'json'
require_relative 'helpers/application'
require_relative 'data_mapper_setup'
require_relative 'controllers/application'
require_relative 'controllers/log_in'
require_relative 'controllers/sign_up'
require_relative 'controllers/get_games'
require_relative 'controllers/game_managment'
require_relative 'controllers/game_page'
require_relative 'controllers/board_controllers'

class SocialBattleShips < Sinatra::Base

  get '/game' do
    erb :game
  end

end
