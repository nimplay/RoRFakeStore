// Array para almacenar los productos en el carrito
const cart = [];
let globalTotal = 0;
console.log("entre javascript")

// Añadir producto al carrito al hacer clic en el botón
const addToCart = (index) => {
  console.log("entre al carrito")
  const quantityInput = document.getElementById(`quantity_${index}`);
  const quantity = parseInt(quantityInput.value, 10);

  if (quantity > 0) {
    const product = products[index]; // Accede al producto desde el array JSON
    const productTotal = quantity * product.price;

    // Buscar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += quantity;
      cart[existingProductIndex].total += productTotal;
    } else {
      cart.push({
        name: product.name,
        price: product.price,
        quantity,
        total: productTotal,
      });
    }

    // Actualizar el total global
    globalTotal += productTotal;

    // Actualizar la factura
    updateInvoice();

    // Reiniciar valores locales
    document.getElementById(`local-total_${index}`).textContent = "0";
    quantityInput.value = "0";

    alert(`${product.name} añadido al carrito.`);
  } else {
    alert('Selecciona una cantidad mayor a 0 antes de añadir al carrito.');
  }
};

// Actualizar el total local (solo muestra el subtotal por producto)
const updateLocalTotal = (index) => {
  console.log("entre al local")
  const quantityInput = document.getElementById(`quantity_${index}`);
  const localTotalSpan = document.getElementById(`local-total_${index}`);

  const product = products[index]; // Accede al producto desde el array JSON
  const quantity = parseInt(quantityInput.value, 10) || 0;

  // Calcular total local
  const localTotal = quantity * product.price;

  // Actualizar texto del total local (sin afectar el global)
  localTotalSpan.textContent = localTotal.toFixed(2);
};

// Actualizar la factura (renderizar los datos del carrito)
const updateInvoice = () => {
  console.log("entre la factura")
  const invoiceBody = document.getElementById('invoice-body');
  invoiceBody.innerHTML = ''; // Limpiar contenido previo

  // Crear una fila para cada producto en el carrito
  cart.forEach(product => {
    const row = `
      <tr>
        <td>${product.name}</td>
        <td>${parseFloat(product.price).toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>${product.total}</td>
      </tr>
    `;
    invoiceBody.innerHTML += row;
  });

  // Actualizar el total global en el HTML
  document.getElementById('grand-total').textContent = globalTotal.toFixed(2);
};

// Simular un proceso de pago
const processPayment = () => {
  console.log("me fui al payment")
  if (globalTotal > 0) {
    alert(`Procesando el pago de ${globalTotal.toFixed(2)}...`);
  } else {
    alert('El carrito está vacío. Agrega productos antes de pagar.');
  }
};
