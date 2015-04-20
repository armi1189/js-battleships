require_relative 'models/user'
require_relative 'models/game'

env = ENV['RACK_ENV'] || 'development'
DataMapper.setup(:default, "postgres://localhost/battleships_#{env}")

DataMapper.finalize
