class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.string :currency
      t.jsonb :subcategory, default: []

      t.timestamps
    end
  end
end
