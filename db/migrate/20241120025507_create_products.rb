class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :src
      t.string :alt
      t.string :name
      t.string :description
      t.decimal :price
      t.string :currency
      t.integer :max

      t.timestamps
    end
  end
end
