class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.string :currency
      t.jsonb :subcategory

      t.timestamps
    end
  end
end
