let cart = [];

function loadCart() {
    const cartData = localStorage.getItem('cart');
    cart = cartData ? JSON.parse(cartData) : [];

    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<h1>Der Warenkorb ist leer.</h1>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - ${item.price}€`;
            cartContainer.appendChild(itemElement);
        });
    }

    document.getElementById('total-price').textContent = total + '€';
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    window.location.href = `./payment.html?price=${total}`;
}