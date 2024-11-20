class Product < ApplicationRecord
  validates :price, numericality: { greater_than_or_equal_to: 0, allow_nil: true }
end
