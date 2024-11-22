json.extract! product, :id, :name, :description, :currency, :subcategory, :created_at, :updated_at
json.url product_url(product, format: :json)
