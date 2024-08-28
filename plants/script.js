document.addEventListener("DOMContentLoaded", function () {
    const plantList = document.getElementById("plant-list");
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutForm = document.getElementById("checkout-form");

    let cart = [];

    const plants = [
        { id: 1, name: "Snake Plant", price: 20, image: "https://link_to_image_1" },
        { id: 2, name: "Aloe Vera", price: 15, image: "https://link_to_image_2" },
        { id: 3, name: "Peace Lily", price: 25, image: "https://link_to_image_3" },
        { id: 4, name: "Spider Plant", price: 18, image: "https://link_to_image_4" },
    ];

    function renderPlants() {
        plants.forEach(plant => {
            const plantItem = document.createElement('div');
            plantItem.className = 'plant-item';
            plantItem.innerHTML = `
                <img src="${plant.image}" alt="${plant.name}">
                <h3>${plant.name}</h3>
                <p>$${plant.price}</p>
                <input type="number" id="quantity-${plant.id}" min="1" value="1">
                <button class="btn" onclick="addToCart(${plant.id})">Add to Cart</button>
            `;
            plantList.appendChild(plantItem);
        });
    }

    function addToCart(plantId) {
        const plant = plants.find(p => p.id === plantId);
        const quantity = parseInt(document.getElementById(`quantity-${plantId}`).value);
        const cartItem = cart.find(item => item.id === plantId);

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ ...plant, quantity });
        }

        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            `;
            cartItems.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${total}`;
    }

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryTime = new Date();
        deliveryTime.setDate(deliveryTime.getDate() + 7); // Delivery in 7 days
        const deliveryDate = deliveryTime.toDateString();

        alert(`Thank you for your order!\n\nTotal Items: ${cart.length}\nTotal Price: $${totalAmount}\nExpected Delivery: ${deliveryDate}`);
        
        // Clear the cart and form
        cart = [];
        renderCart();
        checkoutForm.reset();
    });

    renderPlants();
});
