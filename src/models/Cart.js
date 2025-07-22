class Cart {

    constructor() {
        this.cartItems = []; // Empty array to hold items in the cart
    }

    addItem(item) {
        // Check if the item already exists in the cart
        const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) { // Found
            // Increment current quantity of item
            this.cartItems[existingItemIndex].quantity += item.quantity;
        } else {
            this.cartItems.push(item); // Add CartItem object to the Cart object
        }
    }

    removeItem(index) {
        if (index >= 0 && index < this.cartItems.length) {
            this.cartItems.splice(index, 1);
        }
    }

    clear() {
        this.cartItems = [];
    }

    get totalPrice() {
        let total = 0;
        for (const item of this.cartItems) {
            total += item.totalPrice;
        }
        return total;
    }

    // TODO: Apply discounts
}

export default Cart;