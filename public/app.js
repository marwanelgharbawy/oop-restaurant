import Meal from './models/Meal.js';
import Category from './models/Category.js';
import Choice from './models/Choice.js';
import Options from './models/Options.js';
import CartItem from './models/CartItem.js';
import Cart from './models/Cart.js';

import { pizzaCategory } from './models/Test.js';

console.log("It works again!");

// DOM manipulation to display the menu and cart
const menuContainer = document.getElementById('menu');
const cartContainer = document.getElementById('cart');
const priceElement = document.getElementById('total');

const cart = new Cart();

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.onclick = () => {
    cart.clear();
    renderCart();
};

// Populate the menu->Section with the pizza category
for (const meal of pizzaCategory.meals) {
    // Create a div which will be a container for the base meal element and the choices element
    const mealContainer = document.createElement('div');
    mealContainer.className = 'meal-container';

    // Create a div which contains meal name, description and BASE price
    const mealElement = document.createElement('div');
    mealElement.className = 'meal-details';
    mealElement.textContent = `${meal.name}: ${meal.description} - $${meal.price}`;

    // Create a button which will add the meal to the cart
    const addMealButton = document.createElement('button');
    addMealButton.className = 'add-button';
    addMealButton.textContent = "Add to Cart";
    mealElement.appendChild(addMealButton);

    addMealButton.onclick = () => {
        // Get all choices within element
        const choiceInputs = choicesElement.querySelectorAll('input');
        console.log("Choice inputs:", choiceInputs);
        const selectedChoices = [];
        // Loop over each choice input, only take the checked ones
        for (const choiceInput of choiceInputs) {
            if (choiceInput.checked) {
                // Get the name from the label element next to the input
                const choiceLabel = choiceInput.nextElementSibling.textContent;
                const choice = meal.options.choices.find(c => c.name === choiceLabel);
                if (choice) {
                    selectedChoices.push(choice);
                }
            }
        }
        // When this loop is done, we have all selected choices in the selectedChoices array
        console.log("Selected choices:", selectedChoices);
        const cartItem = new CartItem(meal, selectedChoices, 1);
        cart.addItem(cartItem);
        renderCart();
    }

    mealContainer.appendChild(mealElement);

    // Display choices
    const choicesElement = document.createElement('div'); // Group of choices
    choicesElement.className = 'choices-list';

    for (const choice of meal.options.choices) {
        const choiceContainer = document.createElement('div'); // Container for each choice
        choiceContainer.className = 'choice-item';

        // Create a "choice selector" checkbox or radio button
        const choiceSelector = document.createElement('input'); // For each choice
        choiceSelector.className = 'choice-checkbox';
        if (meal.options.isRadio) {
            choiceSelector.type = 'radio';
        } else {
            choiceSelector.type = 'checkbox';
        }
        choiceContainer.appendChild(choiceSelector);

        // Create label element for the choice
        const choiceLabel = document.createElement('label');
        choiceLabel.className = 'choice-label';
        choiceLabel.textContent = choice.name;
        // TODO: Link label to input
        choiceContainer.appendChild(choiceLabel);

        // Create span for price
        const choicePrice = document.createElement('span');
        choicePrice.className = 'choice-price';
        choicePrice.textContent = `+$${choice.price.toFixed(2)}`;
        choiceContainer.appendChild(choicePrice);

        choicesElement.appendChild(choiceContainer);
    }
    mealElement.appendChild(choicesElement);

    menuContainer.appendChild(mealContainer);
}

function renderCart() {
    // Clear the cart container
    cartContainer.innerHTML = '';

    if (cart.cartItems == 0) {
        cartContainer.textContent = "Your cart is empty.";
    } else {
        for (const item of cart.cartItems) {
            // Cart Item container containing item as inner text and extras as another element
            const cartItemContainer = document.createElement('div');
            cartItemContainer.className = 'cart-item-container';

            cartItemContainer.textContent = `${item.product.name} - $${item.productPrice.toFixed(2)} x ${item.quantity}`;

            // Create a list of selected choices element            
            if (item.selectedChoices.length > 0) {
                const selectedChoicesElement = document.createElement('div');
                selectedChoicesElement.className = 'selected-choices';
                const choicesText = item.selectedChoices.map(choice => choice.name).join(' - ');
                selectedChoicesElement.textContent = `Selected: ${choicesText}`;
                cartItemContainer.appendChild(selectedChoicesElement);
            }
            cartContainer.appendChild(cartItemContainer);
        }
        
    }
    priceElement.textContent = `$${cart.totalPrice.toFixed(2)}`;
}

renderCart();

// We don't need that much DOM manipulation, the Cart and CartItem classes handle everything