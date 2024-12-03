// Sample Data
let products = [];
let cart = [];
let orders = [];
let currentUser = null;

// Register User
function register(event) {
  event.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  currentUser = { name, email, password, orders: [] };
  alert("Registration successful!");
}

// Login User
function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  if (currentUser && currentUser.email === email && currentUser.password === password) {
    alert("Login successful!");
  } else {
    alert("Invalid email or password!");
  }
}

// Add Product (Admin)
function uploadProduct(event) {
  event.preventDefault();
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  products.push({ name, price });
  alert("Product added successfully!");
  displayProducts();
}

// Display Products
function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${product.name} - $${product.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add to Cart
function addToCart(index) {
  cart.push(products[index]);
  alert("Product added to cart!");
}

// Place Order
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  orders.push(...cart);
  cart = [];
  alert("Order placed successfully!");
}

// Display Orders (User)
function displayOrders() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";
  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>Order ${index + 1}: ${order.name} - $${order.price}</p>`;
    orderList.appendChild(div);
  });
}

// Initialize Page
displayProducts();
