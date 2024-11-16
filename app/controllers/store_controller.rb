class StoreController < ApplicationController
  def store
    @products = Product.all 
  end
end
