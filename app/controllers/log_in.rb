class SocialBattleShips < Sinatra::Base
   get '/log_in' do
    erb :log_in
  end

  post '/log_in/new' do
    username = params[:username]
    password = params[:password]
    user = User.authenticate(username, password)
    if user
      session[:user_id] = user.id
      redirect to '/'
    else
      redirect to '/log_in'
    end
  end

  get '/log_out' do
    user = User.first(id: session[:user_id])
    session[:user_id] = nil
    redirect to '/'
  end
end
