const products = [
    { id: 1, name: 'Go Casual', image: 'image/shoe-1.webp', price: 999, quantity: 0 },
    { id: 2, name: 'Gym Ware', image: 'image/shoe-2.jpeg', price: 899, quantity: 0 },
    { id: 3, name: 'Party Vibe', image: 'image/shoe-3.jpeg', price: 1899, quantity: 0 },
    { id: 4, name: 'Office Look', image: 'image/shoe-4.jpeg', price: 1299, quantity: 0 },
    { id: 5, name: 'Ethnic Ware', image: 'image/shoes-5.jpeg', price: 1599, quantity: 0 },
  ];
  
  let cart = [];
  
  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const averagePriceElement = document.getElementById('average-price');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  
  function renderProducts(productArray) {
    productList.innerHTML = productArray
      .map(product => `
        <div class="product">
          <div>
             <div class="image"><img src="${product.image}" alt="${product.name} class="img"></div>
            <p>${product.name}</p>
          </div>
          <div>
            <p>Price: ₹<b>${product.price}</b></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `)
      .join('');
  }
  
  function renderCart() {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
      totalPriceElement.innerText = 'Total: ₹0';
      averagePriceElement.innerText = 'Average Price: ₹0';
      return;
    }
  
    cartItems.innerHTML = cart
      .map(item => `
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
      `)
      .join('');
  
    totalPriceElement.innerText = `Total: ₹${calculateTotalPrice()}`;
    averagePriceElement.innerText = `Average Price: ₹${calculateAveragePrice()}`;
  }
  
  function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    renderCart();
  }
  
  function removeFromCart(id) {
    const existingItem = cart.find(item => item.id === id);
  
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        cart = cart.filter(item => item.id !== id);
      }
    }
  
    renderCart();
  }
  
  
  clearCartBtn.addEventListener('click', () => {
    cart = [];
    renderCart();
    alert('Your cart is now empty.');
  });
  
  function calculateTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }
  
  function calculateAveragePrice() {
    if (cart.length === 0) return 0;
    return (calculateTotalPrice() / cart.length).toFixed(2);
  }
  
  document.getElementById('price-filter').addEventListener('change', event => {
    const value = event.target.value;
    let sortedProducts = [...products];
  
    if (value === 'htl') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === 'lth') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
  
    renderProducts(sortedProducts);
  });
  
  renderProducts(products);
  renderCart();
  