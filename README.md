Initialize an empty cart (cart = [])
Define an array of products (products = [ ... ])

Function renderCart():
    If the cart is empty:
        Display "Your cart is empty."
        Set total price to 0
        Set average price to 0
    Else:
        For each item in the cart:
            Display the item's image, name, price, and quantity
            Provide an option to remove the item from the cart
        Calculate and display the total price
        Calculate and display the average price

Function addToCart(product_id, product_name, product_image, product_price):
    Check if the product already exists in the cart:
        If yes:
            Increase the quantity of that product by 1
        If no:
            Add the product to the cart with quantity 1
    Call renderCart() to update the cart view

Function removeFromCart(product_id):
    Remove the product with the given product_id from the cart
    Call renderCart() to update the cart view

Function calculateTotalPrice():
    Initialize totalPrice to 0
    For each item in the cart:
        Add (item.price * item.quantity) to totalPrice
    Return totalPrice

Function calculateAveragePrice():
    If the cart is empty:
        Return 0
    Calculate total price by calling calculateTotalPrice()
    Return (totalPrice / number of items in the cart)

Function clearCart():
    Empty the cart
    Call renderCart() to reset the cart view
    Display a message: "Your cart is empty."

Function sortProducts():
    Get the sort option (low-to-high or high-to-low) from the user
    If sort option is "low-to-high":
        Sort the products array by price in ascending order
    If sort option is "high-to-low":
        Sort the products array by price in descending order
    Call renderProducts() to update the product list

Function filterProducts():
    Get the search query from the user
    For each product in the products array:
        Check if the product's name contains the search query (case-insensitive)
    Display the filtered products by calling renderProducts()

Function renderProducts(filteredProducts):
    For each product in filteredProducts:
        Display the product's image, name, price, and "Add to Cart" button
    Set up an event listener for the "Add to Cart" button to call addToCart()

Start the program:
    Call renderProducts(products) to display the initial list of products
    Set up event listeners for the sort filter, search filter, and add to cart buttons
    Set up event listener for the clear cart button

