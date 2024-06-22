let cart = [];

function addToCart(event) {
    const productElement = event.target.parentElement;
    const id = productElement.getAttribute('data-id');
    const name = productElement.getAttribute('data-name');
    const price = parseFloat(productElement.getAttribute('data-price'));

    const product = { id, name, price };

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    renderCart();
}

function renderCart() {
    const cartContainer = document.querySelector('.cart');
    const totalContainer = document.querySelector('.total');

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span class="precio">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="btn-eliminar"onclick="removeFromCart('${item.id}')">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function toggleCart() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.classList.toggle('open');
}