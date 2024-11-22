class Product < ApplicationRecord
  # Validaciones o callbacks pueden ir aquí
  before_save :process_subcategory

  private

  def process_subcategory
    # Si subcategory es un arreglo o tiene una estructura compleja, puedes hacer ajustes aquí
    if subcategory.present? && subcategory.is_a?(Array)
      subcategory.each do |subcat|
        subcat["price"] = subcat["price"].to_f if subcat["price"]
      end
    end
  end
end
