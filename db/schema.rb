
ActiveRecord::Schema[7.2].define(version: 2024_11_20_010944) do
  enable_extension "plpgsql"
  create_table "products", force: :cascade do |t|
    t.string "src"
    t.string "alt"
    t.string "name"
    t.string "description"
    t.float "price"
    t.string "currency"
    t.integer "max"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
