class Paypal::CheckoutsController < ApplicationController
  include PayPal::SDK::REST

  def create
     # frontend data
     cart_total = params[:total]
     cart_items = params[:items]

     payment = Payment.new({
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: paypal_checkouts_thank_you_url,
        cancel_url: paypal_checkouts_cancel_url
      },
      transactions: [
        {
          amount: {
            total: cart_total.to_s,
            currency: "USD"
          },
          description: "Compra de Retratos",
          item_list: {
            items: cart_items.map { |item|
              {
                name: item[:name],
                sku: item[:sku],
                price: item[:price],
                currency: item[:currency],
                quantity: item[:quantity]
              }
            }
          }
        }
      ]
    })

    if payment.create
      redirect_to payment.links.find { |v| v.rel == "approval_url" }.href
    else
      redirect_to store_path, alert: "Error al procesar el pago."
    end
  end

  def complete
    payment = Payment.find(params[:paymentId])
    if payment.execute(payer_id: params[:PayerID])
      session[:cart] = nil
      redirect_to paypal_checkouts_thank_you_url, notice: "¡Pago procesado correctamente!"
    else
      redirect_to store_path, alert: "Hubo un problema al procesar el pago. Intenta nuevamente."
    end
  end


  def thank_you
    render "thank_you"
  end
  def cancel
     redirect_to store_path, notice: "Tu transacción ha sido cancelada."
  end
end
