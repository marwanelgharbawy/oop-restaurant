class CartItem {
  constructor(product, selectedChoices, quantity) {
    this.product = product;
    this.selectedChoices = selectedChoices; // A list of Choice objects
    this.quantity = quantity;
    this.id = this.#generateID();
  }

  // Each meal has a unique ID based on its name and selected choices
  #generateID() {
    const choiceString = this.selectedChoices.map(choice => choice.name).sort();
    return `${this.product.name}-${choiceString.join('-')}`;
  }

  // (Base price + Extras)
  get productPrice() {
    return this.product.price + this.#calculateExtrasPrice();
  }

  get totalPrice() {
    // (Base price + Extras) * Quantity
    return this.productPrice * this.quantity;
  }

  #calculateExtrasPrice() {
    let extraPrice = 0;
    if (this.selectedChoices) {
      for (const choice of this.selectedChoices) {
        extraPrice += choice.price; // Get the price of each choice
      }
    }
    return extraPrice;
  }
}

export default CartItem;