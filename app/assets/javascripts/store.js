// Array para almacenar los productos en el carrito
const cart = [];
let globalTotal = 0;
let cartCount = 0;

// Añadir un producto al carrito
function addToCart(index) {
  const product = products[index];
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === product.name
  );

  if (existingItemIndex !== -1) {
    if (
      cartItems[existingItemIndex].quantity < cartItems[existingItemIndex].max
    ) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      alert("Has alcanzado el máximo disponible para este producto.");
      return;
    }
  } else {
    cartItems.push({
      name: product.name,
      price: product.price,
      currency: product.currency,
      src: product.src,
      quantity: 1,
      max: product.max,
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCart();

  // Mostrar Toast de confirmación
  showToast(`${product.name} ha sido añadido al carrito.`);

  // Actualizar la notificación del carrito
  updateCartNotification();
}

// Sincronizar la notificación del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  updateCartNotification(); // Asegura que el contador esté sincronizado
});


// Actualizar notificacion del carrito
function updateCartNotification() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const notification = document.getElementById('cart-notification');
  notification.textContent = totalItems;

  // Mostrar u ocultar la notificación
  if (totalItems > 0) {
    notification.classList.remove('hidden');
  } else {
    notification.classList.add('hidden');
  }
}



// Simulación para abrir el modal del carrito
function openCartModal() {
  console.log("Abriendo el modal del carrito...");
}

// Función para mostrar un toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "#4CAF50";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
  toast.style.zIndex = "1000";
  document.body.appendChild(toast);

  // Ocultar el Toast después de 3 segundos
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Actualizar la cantidad de un producto en el carrito
function updateQuantity(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const newQuantity = document.getElementById(`quantity_${index}`).value;

  if (newQuantity < 0 || newQuantity > cartItems[index].max) {
    alert(
      `La cantidad no puede ser menor que 0 o mayor que ${cartItems[index].max}.`
    );
    return;
  }

  cartItems[index].quantity = parseInt(newQuantity);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  updateCart();
}

// Actualizar el carrito con los productos añadidos
function updateCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const invoiceBody = document.getElementById("invoice-body");
  const grandTotalElement = document.getElementById("grand-total");
  invoiceBody.innerHTML = "";
  let grandTotal = 0;

  cartItems.forEach((item, index) => {
    const productTotal = item.quantity * item.price;
    grandTotal += productTotal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="centered-content">
        <img src="${item.src}" alt="${item.name}" width="60" /> ${item.name}
      </td>
      <td>${item.price} ${item.currency}</td>
      <td>
        <input
          type="number"
          value="${item.quantity}"
          min="0"
          max="${item.max}"
          id="quantity_${index}"
          onchange="updateQuantity(${index})"
        />
      </td>
      <td>${productTotal.toFixed(2)} ${item.currency}</td>
      <td>
        <button class="button-delete" onclick="removeItem(${index})">X</button>
      </td>
    `;
    invoiceBody.appendChild(row);
  });

  grandTotalElement.innerText = grandTotal.toFixed(2);
}

// Eliminar un producto del carrito
function removeItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCart();
}

// Actualizar el total local (solo muestra el subtotal por producto)
const updateLocalTotal = (index) => {
  const quantityInput = document.getElementById(`quantity_${index}`);
  const localTotalSpan = document.getElementById(`local-total_${index}`);
  const product = products[index];
  const quantity = parseInt(quantityInput.value, 10) || 0;
  const localTotal = quantity * product.price;

  localTotalSpan.textContent = localTotal.toFixed(2);
};

// Desabilitar boton del carrito
function toggleAddButton(index) {
  const quantityInput = document.getElementById(`quantity_${index}`);
  const addButton = document.getElementById(`add-button_${index}`);
  const quantity = parseInt(quantityInput.value, 10);

  // Habilitar o deshabilitar el botón
  if (quantity > 0) {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
}

// Abrir el modal
function openCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "block";
  updateCart();
}

// Cerrar el modal
function closeModal() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "none";
}

// Simular un proceso de pago
const processPayment = () => {
  if (globalTotal > 0) {
    alert(`Procesando el pago de ${globalTotal.toFixed(2)}...`);
  } else {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
  }
};
