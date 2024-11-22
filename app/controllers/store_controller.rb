class StoreController < ApplicationController
  def store
    @products = Product.all
  end
  def process_payment
    total = params[:total]
  end
end
