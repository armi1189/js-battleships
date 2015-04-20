class SocialBattleShips < Sinatra::Base
  get '/sign_up' do
    erb :sign_up
  end

  post '/sign_up/new' do
    @user = User.new(username: params[:username],
                     email: params[:email],
                     password: params[:password],
                     password_confirmation: params[:confirmation])
    if @user.save
      session[:user_id] = @user.id
      redirect to('/')
    else
      redirect to('/sign_up')
    end
  end
end