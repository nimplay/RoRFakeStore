class ChangePriceToFloatInProducts < ActiveRecord::Migration[7.2]
  def up
    change_column :products, :price, :float
  end

  def down
    change_column :products, :price, :decimal, precision: 5, scale: 2
  end
end
