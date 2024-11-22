// Array para almacenar los productos en el carrito
let cart = [];

// Recuperar el carrito desde localStorage al cargar la página
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart); // Convertir el string del localStorage a un array de objetos
  }
}

// Función para actualizar el total cuando cambia la selección de subcategorías
function updateTotal(index) {
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedPrice = parseFloat(selectElement.value); // Convertir el precio a número
  const totalElement = document.getElementById(`local-total-${index}`);

  if (isNaN(selectedPrice)) {
    totalElement.innerText = "0";
    return;
  }

  totalElement.innerText = selectedPrice.toFixed(2); // Mostrar con 2 decimales
}

// Función para actualizar la imagen del producto cuando se selecciona una subcategoría
function updateImage(index) {
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedSubIndex = selectElement.value; // Índice de la subcategoría seleccionada
  const imageElement = document.getElementById(`product-image-${index}`);

  if (selectedSubIndex === "") {
    return;
  }

  const subcategory = products[index].subcategory[selectedSubIndex];
  imageElement.src = subcategory.src; // Actualiza la imagen con la nueva fuente
  imageElement.alt = subcategory.alt; // Actualiza el texto alternativo de la imagen
}

// Función para actualizar el total y la descripción al seleccionar una subcategoría
function updateDetails(index) {
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedSubIndex = selectElement.value; // Índice de la subcategoría seleccionada
  const totalElement = document.getElementById(`local-total-${index}`);
  const descriptionElement = document.getElementById(`subcategory-description-${index}`);

  if (selectedSubIndex === "") {
    totalElement.innerText = "0";
    descriptionElement.innerText = " ";
    return;
  }

  const subcategory = products[index].subcategory[selectedSubIndex];
  totalElement.innerText = parseFloat(subcategory.price).toFixed(2);
  descriptionElement.innerText = subcategory.description || "Sin descripción disponible.";

  // Llamar a la función para actualizar la imagen
  updateImage(index);

  // Habilitar el botón de agregar al carrito si se ha seleccionado una subcategoría
  document.getElementById(`add-button-${index}`).disabled = false;
}

// Función para abrir el modal del carrito
function openCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.add("open");
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.remove("open");
}

// Función para actualizar la notificación del carrito
function updateCartNotification() {
  const notification = document.getElementById("cart-notification");
  notification.textContent = cart.length; // Muestra el número de productos en el carrito
  if (cart.length > 0) {
    notification.classList.remove("hidden");
  } else {
    notification.classList.add("hidden");
  }
}

// Función para agregar productos al carrito
function addToCart(index) {
  const product = products[index];
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedSubcategoryIndex = selectElement.value;

  if (selectedSubcategoryIndex === "") {
    alert("Por favor selecciona una subcategoría.");
    return;
  }

  const subcategory = product["subcategory"][selectedSubcategoryIndex];

  const cartItem = {
    name: product["name"],
    subcategory: subcategory["name"],
    link: subcategory["src"],
    alt: subcategory["alt"],
    price: subcategory["price"],
    currency: product["currency"],
  };

  cart.push(cartItem); // Agregar el producto al carrito

  // Guardar el carrito en el localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartNotification(); // Actualizar la notificación del carrito
  updateCartItems(); // Mostrar los elementos del carrito en el modal

  // Actualizar el total en el modal
  updateTotalInModal();

  // Mostrar la notificación de producto añadido al carrito
  showAddToCartNotification();
}

// Función para mostrar la notificación de producto añadido al carrito
function showAddToCartNotification() {
  const notification = document.getElementById("add-to-cart-notification");
  notification.classList.add("show");

  // Ocultar la notificación después de 3 segundos
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000); // 3 segundos
}

// Función para eliminar un producto del carrito
function removeItemFromCart(index) {
  // Eliminar el producto del carrito usando el índice
  cart.splice(index, 1);

  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Actualizar la vista del carrito y el total después de eliminar el producto
  updateCartItems();
  updateTotalInModal();
  updateCartNotification();
}

// Función para actualizar los elementos dentro del carrito en el modal
function updateCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Limpiar el contenido actual

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
      <div class="cart-item-container">
        <div class="cart-item-img">
          <img src="${item.link}" alt="${item.alt}" />
        </div>
        <div class="cart-item-details">
          <p class="cart-item-name">${item.name} <br /> ${item.subcategory}</p>
          <p>Cantidad: ${item.price} ${item.currency}</p>
        </div>
        <button onclick="removeItemFromCart(${index})">X</button>
      </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
  }
}

// Función para actualizar el total del carrito en el modal
function updateTotalInModal() {
  let total = 0;
  const currency = '$';

  // Sumar el precio de todos los productos en el carrito
  cart.forEach(item => {
    total += parseFloat(item.price); // Sumar el precio del producto
  });

  // Actualizar el contenido del elemento con el total
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `${total.toFixed(2)} ${currency}`; // Añadir el símbolo de la moneda al total
}

// Función de ejemplo para el pago
function processPayment() {
  alert("Procesando pago...");
}

// Llamar a la función para cargar el carrito desde localStorage cuando se cargue la página
window.onload = function() {
  loadCartFromLocalStorage();
  updateCartNotification();
  updateCartItems();
  updateTotalInModal();
};
