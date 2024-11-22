class StoreController < ApplicationController
  def store
    @products = Product.all.map do |product|
      product.attributes.merge(subcategory: JSON.parse(product.subcategory.to_json))
    end
  end
  def process_payment
    total = params[:total]
  end
end
