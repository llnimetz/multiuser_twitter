get '/' do
  erb :index
end

get '/sign_in' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/auth' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  # # our request token is only valid until we use it to get an access token, so let's delete it from our session
  session.delete(:request_token)


  @user = User.create(username: @access_token.params[:screen_name], oauth_token: @access_token.token, oauth_secret: @access_token.secret)
  session[:user_id] = @user.id
  puts "*" * 40
  puts session[:user_id]
  puts @user.inspect

  erb :index
end

post '/tweets' do
  @user = Twitter::Client.new(
  :oauth_token => current_user.oauth_token,
  :oauth_token_secret => current_user.oauth_secret
)

  @user.update(params[:user_tweet])
  # redirect '/' unless request.xhr?
  erb :index
end
