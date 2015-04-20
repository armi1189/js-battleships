class SocialBattleShips < Sinatra::Base 

  set :views, Proc.new { File.join(root, "../views") }
  set :public_folder, Proc.new { File.join(root, "../public") }

  enable :sessions
  set :session_secret, 'super secret'
  use Rack::Flash
  use Rack::MethodOverride

  include Helpers

  get '/' do
    erb :index
  end
end