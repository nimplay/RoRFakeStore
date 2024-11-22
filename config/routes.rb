Rails.application.routes.draw do
  resources :products
  # Home Route
  root to: "home#home"

  # Content Route
  get "/content", to: "content#content", as: "content"

  # Store Route
  get "/store", to: "store#store"

  # Portfolio Route
  get "/portfolio", to: "portfolio#portfolio"

   # Bio Route
  get "/bio", to: "bio#bio"

  namespace :paypal do
    resources :checkouts, only: [:create] do
      collection do
        get :thank_you, path: 'thank-you' 
        get :cancel
      end
    end
  end
end
