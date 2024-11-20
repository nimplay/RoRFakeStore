class StoreController < ApplicationController
  def store
    @products = Product.all
  end
  def process_payment
    total = params[:total]
    # Aquí puedes conectarte a la API de PayPal u otra pasarela de pago
    # Ejemplo con PayPal SDK o configuración de un formulario con su API
  end
end
