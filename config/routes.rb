Rails.application.routes.draw do
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
end
