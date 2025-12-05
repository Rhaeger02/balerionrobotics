class ShoppingCart {
    constructor() {
        this.cart = [];
        this.init();
    }

    init() {
        this.loadCart();
        this.setupEventListeners();
        this.updateCartDisplay();
    }

    setupEventListeners() {
        // Botones "WANT IT!"
        document.querySelectorAll('.product button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productElement = e.target.closest('.product');
                this.addToCart(productElement);
            });
        });

        // Icono del carrito
        document.getElementById('cart-icon').addEventListener('click', () => {
            this.openCart();
        });

        // Cerrar carrito
        document.querySelector('.close-cart').addEventListener('click', () => {
            this.closeCart();
        });

        // Vaciar carrito
        document.getElementById('empty-cart').addEventListener('click', () => {
            this.emptyCart();
        });

        // Pagar ahora
        document.getElementById('pay-now').addEventListener('click', () => {
            window.open('https://www.paypal.com', '_blank');
        });

        // Cerrar al hacer click fuera
        document.getElementById('cart-modal').addEventListener('click', (e) => {
            if (e.target.id === 'cart-modal') {
                this.closeCart();
            }
        });
    }

    addToCart(productElement) {
        const product = {
            id: this.generateId(productElement),
            name: productElement.querySelector('h3').textContent,
            price: this.getProductPrice(productElement),
            image: productElement.querySelector('img').src,
            quantity: 1
        };

        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push(product);
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartAnimation(productElement);
        this.openCart();
    }

    getProductPrice(productElement) {
        const offerPrice = productElement.querySelector('.offer').textContent;
        return parseFloat(offerPrice.replace('Now: S/. ', ''));
    }

    generateId(productElement) {
        return productElement.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.renderCartItems();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
                this.renderCartItems();
            }
        }
    }

    emptyCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.renderCartItems();
        this.closeCart();
    }

    openCart() {
        document.getElementById('cart-modal').style.display = 'block';
        this.renderCartItems();
    }

    closeCart() {
        document.getElementById('cart-modal').style.display = 'none';
    }

    renderCartItems() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty</p>';
            return;
        }

        this.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <p>S/. ${item.price} x ${item.quantity}</p>
                    <p>Subtotal: S/. ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span style="min-width: 20px; text-align: center;">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-btn" data-id="${item.id}">REMOVE</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        // Event listeners para los botones de cantidad y remove
        cartItems.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateQuantity(e.target.dataset.id, -1);
            });
        });

        cartItems.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateQuantity(e.target.dataset.id, 1);
            });
        });

        cartItems.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.removeFromCart(e.target.dataset.id);
            });
        });
    }

    updateCartDisplay() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        document.getElementById('cart-count').textContent = totalItems;
        document.getElementById('cart-total').textContent = totalPrice.toFixed(2);
    }

    showAddToCartAnimation(element) {
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    saveCart() {
        localStorage.setItem('balerion-cart', JSON.stringify(this.cart));
    }

    loadCart() {
        const savedCart = localStorage.getItem('balerion-cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});