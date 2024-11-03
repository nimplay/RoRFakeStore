Rails.application.routes.draw do
  # Home Route
  root to: 'home#home'

  # Content Route
  get '/content', to: 'content#content', as: 'content'

  # Store Route
  get '/store', to: 'store#store'

end
