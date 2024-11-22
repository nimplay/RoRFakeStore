let cart = [];
let cartTotal = 0;

// Read local storage
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

// Function to update total when subcategory selection changes
function updateTotal(index) {
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedPrice = parseFloat(selectElement.value);
  const totalElement = document.getElementById(`local-total-${index}`);
  if (isNaN(selectedPrice)) {
    totalElement.innerText = "0";
    return;
  }
  totalElement.innerText = selectedPrice.toFixed(2);
}

// Function to update the product image when a subcategory is selected
function updateImage(index) {
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedSubIndex = selectElement.value;
  const imageElement = document.getElementById(`product-image-${index}`);
  if (selectedSubIndex === "") {
    return;
  }
  const subcategory = products[index].subcategory[selectedSubIndex];
  imageElement.src = subcategory.src;
  imageElement.alt = subcategory.alt;
}

// Function to update total and description when selecting a subcategory
function updateDetails(index) {
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedSubIndex = selectElement.value;
  const totalElement = document.getElementById(`local-total-${index}`);
  const descriptionElement = document.getElementById(
    `subcategory-description-${index}`
  );
  if (selectedSubIndex === "") {
    totalElement.innerText = "0";
    descriptionElement.innerText = " ";
    return;
  }
  const subcategory = products[index].subcategory[selectedSubIndex];
  totalElement.innerText = parseFloat(subcategory.price).toFixed(2);
  descriptionElement.innerText =
    subcategory.description || "Sin descripción disponible.";
  updateImage(index);
  document.getElementById(`add-button-${index}`).disabled = false;
}

// Function to open the cart modal
function openCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.add("open");
}

// Function to close the cart modall
function closeModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.remove("open");
}

// Function to update the cart notification
function updateCartNotification() {
  const notification = document.getElementById("cart-notification");
  notification.textContent = cart.length;
  if (cart.length > 0) {
    notification.classList.remove("hidden");
  } else {
    notification.classList.add("hidden");
  }
}

// Add products to cart function
function addToCart(index) {
  const product = products[index];
  const selectElement = document.getElementById(`subcategory-select-${index}`);
  const selectedSubcategoryIndex = selectElement.value;
  if (selectedSubcategoryIndex === "") {
    alert("Por favor selecciona una subcategoría.");
    return;
  }
  const subcategory = product["subcategory"][selectedSubcategoryIndex];
  const sku = product["name"] + subcategory["name"] + subcategory["price"];
  const cartItem = {
    name: product["name"],
    subcategory: subcategory["name"],
    link: subcategory["src"],
    alt: subcategory["alt"],
    price: subcategory["price"],
    currency: product["currency"],
    sku: sku,
    quantity: 1,
  };
  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartNotification();
  updateCartItems();
  updateTotalInModal();
  showAddToCartNotification();
}

// Function to display notification of product added to cart
function showAddToCartNotification() {
  const notification = document.getElementById("add-to-cart-notification");
  notification.classList.add("show");

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Function to remove a product from the cart
function removeItemFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartItems();
  updateTotalInModal();
  updateCartNotification();
}

// Function to update the items inside the cart in the modal
function updateCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";
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

// Function to update the cart total in the modal
function updateTotalInModal() {
  let total = 0;
  const currency = "$";
  cart.forEach((item) => {
    total += parseFloat(item.price);
  });
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `${total.toFixed(2)} ${currency}`;
  cartTotal = total;
}

// Payment proccess
function processPayment() {
  const cartItems = cart.map((item) => ({
    name: item.name,
    sku: item.sku,
    price: item.price,
    currency: item.currency,
    quantity: item.quantity,
  }));
  fetch("/paypal/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      total: cartTotal,
      items: cartItems,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("Error al procesar el pago");
      }
    })
    .catch((error) => {
      console.error("Error en el pago:", error);
      alert("Error al procesar el pago");
    });
}

// Call the function to load the cart from localStorage when the page loads
window.onload = function () {
  loadCartFromLocalStorage();
  updateCartNotification();
  updateCartItems();
  updateTotalInModal();
};
