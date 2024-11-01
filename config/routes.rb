Rails.application.routes.draw do
  root to: 'home#home'
  # Ruta para el controlador Content
  get '/content', to: 'content#content', as: 'content'

  # Ruta para el controlador Store
  get '/store', to: 'store#index'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
