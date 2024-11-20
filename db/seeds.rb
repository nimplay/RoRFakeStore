# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Product.create!(
  src: 'https://senora-garabato-images.s3.us-east-2.amazonaws.com/images/Portfolio/BotanicSpiderma.JPG',
  alt: 'Spider',
  name: 'Retratos',
  description: 'Retratos ilustrados',
  price: 10,
  currency: '$',
  max: 6
)
