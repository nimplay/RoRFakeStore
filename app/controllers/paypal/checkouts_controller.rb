class Paypal::CheckoutsController < ApplicationController
  include Paypal::SDK::REST

  def create
    payment = Payment.new({
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: paypal_checkouts_thank_you_url,
        cancel_url: paypal_checkouts_cancel_url
      },
      transactions: [
        {
          amount: {
            total: current_cart.total,
            currency: 'USD'
          },
          description: 'Compra de Retratos',
          item_list: {
            items: current_cart.line_items.map(&:to_paypal)
          }
        }
      ]
    })

    if payment.create
      redirect_to payment.links.find { |v| v.rel == 'approval_url' }.href
    else
      redirect_to store_path, alert: "Error al procesar el pago."
    end
  end

  
  def thank_you
    # Aquí podrías vaciar el carrito o mostrar un mensaje de agradecimiento.
    # Renderiza una vista o redirige a otra página si es necesario.
    render 'thank_you'
  end

  # Acción para cancel
  def cancel
    # Redirige directamente a la tienda
    redirect_to store_path, alert: "Has cancelado tu compra."
  end
end

