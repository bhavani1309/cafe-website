document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.querySelector('.cart-items-container');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const itemName = this.dataset.name;
            const itemPrice = parseFloat(this.dataset.price);

            const cartItem = {
                name: itemName,
                price: itemPrice,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.name === itemName);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity++;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Item added to cart');
            updateCartItems();
        });
    });

    function updateCartItems() {
        cartItemsContainer.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="fas fa-times" data-index="${index}"></span>
                <img src="lemon.jpg" alt="">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">₹${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <span class="qty">${item.quantity}</span>
                        <button class="increase-qty" data-index="${index}">+</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.increase-qty').addEventListener('click', () => updateQuantity(index, 1));
            cartItem.querySelector('.decrease-qty').addEventListener('click', () => updateQuantity(index, -1));
            cartItem.querySelector('.fas.fa-times').addEventListener('click', () => removeItem(index));
        });

        const checkoutButton = document.createElement('a');
        checkoutButton.href = 'checkout.html'; // Redirects to checkout page
        checkoutButton.classList.add('btn');
        checkoutButton.textContent = 'Checkout Now';
        cartItemsContainer.appendChild(checkoutButton);
    }

    function updateQuantity(index, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart[index];

        item.quantity += change;
        if (item.quantity <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartItems();
    }

    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartItems();
    }

    updateCartItems(); // Initialize cart display
});
