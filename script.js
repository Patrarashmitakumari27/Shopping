let cart = [];


function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const averagePriceElement = document.getElementById('average-price');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElement.innerText = 'Total: ₹0';
    averagePriceElement.innerText = 'Average Price: ₹0';
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <div>
          <img src="${item.image}" alt="${item.name}">
          <span>${item.name}</span>
        </div>
        <div>
          <span>₹${item.price} x ${item.quantity}</span>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `
    )
    .join('');

  totalPriceElement.innerText = `Total: ₹${calculateTotalPrice()}`;
  averagePriceElement.innerText = `Average Price: ₹${calculateAveragePrice()}`;
}


function addToCart(id, name, image, price) {
  const productIndex = cart.findIndex((item) => item.id === id);

  if (productIndex > -1) {
    cart[productIndex].quantity += 1;
  } else {
    cart.push({ id, name, image, price, quantity: 1 });
  }

  renderCart();
}


function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}


function calculateTotalPrice() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}


function calculateAveragePrice() {
  if (cart.length === 0) return 0;
  const totalPrice = calculateTotalPrice();
  return (totalPrice / cart.length).toFixed(2);
}

function clearCart() {
  cart = [];
  renderCart();
  alert('Your cart is empty.');
}


function sortProducts() {
  const sortOption = document.getElementById('price-filter').value;

  if (sortOption === 'low-to-high') {
    cart.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-to-low') {
    cart.sort((a, b) => b.price - a.price);
  }

  renderCart();
}
function filterProducts() {
  const filterOption = document.getElementById('filter-option').value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterOption)
  );
  
  renderProducts(filteredProducts);
}


function renderProducts(filteredProducts) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = filteredProducts
    .map(
      (product) => `
      <div class="product">
        <div>
          <div class="image"><img src="${product.image}" alt="${product.name}"></div>
          <span>${product.name}</span>
        </div>
        <div>
          <p>Price: <b>₹${product.price}</b></p>
          <button onclick="addToCart(${product.id}, '${product.name}', '${product.image}', ${product.price})">Add to Cart</button>
        </div>
      </div>
    `
    )
    .join('');
}

const products = [
  { id: 1, name: 'Go Casual', image: 'Image/shoe-1.webp', price: 999 },
  { id: 2, name: 'Gym Look', image: 'Image/shoe-2.jpeg', price: 799 },
  { id: 3, name: 'Party Vibe', image: 'Image/shoe-3.jpeg', price: 1599 },
  { id: 4, name: 'Office Look', image: 'Image/shoe-4.jpeg', price: 1999 },
  { id: 5, name: 'Ethnic Wear', image: 'Image/shoes-5.jpeg', price: 899 },
];


document.querySelectorAll('.product button').forEach((button, index) => {
  const product = products[index];
  button.addEventListener('click', () => {
    addToCart(product.id, product.name, product.image, product.price);
  });
});


document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
document.getElementById('price-filter').addEventListener('change', sortProducts);
document.getElementById('filter-option').addEventListener('input', filterProducts);

renderProducts(products); 
