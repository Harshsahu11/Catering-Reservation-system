let products = JSON.parse(localStorage.getItem("products")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Register User
function register(event) {
  event.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(user => user.email === email)) {
    alert("Email already registered. Please log in.");
    return;
  }

  const newUser = { name, email, password, cart: [], orders: [] };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  currentUser = newUser;

  alert("Registration successful!");
  location.href = "login.html";
}

// Login User
function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    location.href = "my-orders.html";
  } else {
    alert("Invalid email or password!");
  }
}

// Add Product (Admin)
function uploadProduct(event) {
  event.preventDefault();
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const imageInput = document.getElementById("productImage");

  if (!name || price <= 0 || !imageInput.files[0]) {
    alert("Please provide valid product details and an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;
    const product = { name, price, image };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added successfully!");
    displayProducts();
  };
  reader.readAsDataURL(imageInput.files[0]);
}

// Display Products
function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px; object-fit:cover;">
      <p>${product.name} - $${product.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add to Cart
function addToCart(index) {
  if (!currentUser) {
    alert("Please log in to add products to the cart.");
    return;
  }

  currentUser.cart.push(products[index]);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  alert("Product added to cart!");
}

// Place Order
function placeOrder() {
  if (!currentUser || currentUser.cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  currentUser.orders.push(...currentUser.cart);
  currentUser.cart = [];
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  alert("Order placed successfully!");
}

// Display Orders (User)
function displayOrders() {
  if (!currentUser || currentUser.orders.length === 0) {
    alert("No orders found!");
    return;
  }

  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";
  currentUser.orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${order.image}" alt="${order.name}" style="width:100px; height:100px; object-fit:cover;">
      <p>Order ${index + 1}: ${order.name} - $${order.price}</p>
    `;
    orderList.appendChild(div);
  });
}

// Initialize Page
if (document.getElementById("productList")) {
  displayProducts();
}
