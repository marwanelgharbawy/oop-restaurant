import Meal from './Meal.js';
import Category from './Category.js';
import Choice from './Choice.js';
import Options from './Options.js';
import CartItem from './CartItem.js';
import Cart from './Cart.js';

// Simulate database data for meals and condiments

// Returns a Category object containing meals containing Options containing Choices
function createCategory() {
    // Step 1: Choice class
    // Pizza condiments is an array of choices
    const Pepperoni = new Choice('Pepperoni', 2.99);
    const Jalapeno = new Choice('Jalapeno', 0.99);
    const Olives = new Choice('Olives', 1.49);
    const Ketchup = new Choice('Ketchup', 0.49);
    const Mustard = new Choice('Mustard', 0.49);

    // Array of choice classes
    const choicesArray = [Pepperoni, Jalapeno, Olives, Ketchup, Mustard];

    // Step 2: Options class
    const pizzaOptions = new Options('Pizza Condiments', choicesArray, false);

    // Step 3: Meal class
    const MaroPizza = new Meal('Maro Pizza', 'Standard pizza', pizzaOptions, 10.99);
    const BBQPizza = new Meal('BBQ Chicken Pizza', 'No description', pizzaOptions, 14.99);
    const RanchPizza = new Meal('Chicken Ranch Pizza', 'No description', pizzaOptions, 12.99);

    // Array of meal classes
    const PizzaArray = [MaroPizza, BBQPizza, RanchPizza];

    // Step 4: Category class
    const pizzaCategory = new Category('Pizzas', PizzaArray);

    // Display the meals in the pizza category
    console.log(`Category: ${pizzaCategory.name}\n`);
    console.log('Meals:');
    pizzaCategory.meals.forEach((meal) => {
        console.log(`- ${meal.name}: ${meal.description} - $${meal.price}`);
        console.log('  Condiments:');
        meal.options.choices.forEach((condiment) => {
            console.log(`  - ${condiment.name}: $${condiment.price}`);
        });
        console.log("\n");
    });

    return pizzaCategory;
}

export const pizzaCategory = createCategory(); // Create the category and export it


// Simulate a shopping cart system

// **********************************************************************************************************
// Display cart function
function displayCart(cart) {
    console.log("\n--- Current Shopping Cart ---");
    if (cart.cartItems.length === 0) {
        console.log("The cart is empty.");
    } else {
        console.log(`Cart count: ${cart.cartItems.length}`);
        for (const item of cart.cartItems) {
            console.log(`${item.product.name} x ${item.quantity}`);
            console.log(`Extras: ${item.selectedChoices.map(choice => choice.name).join(', ')}`);
            console.log(`Price: $${item.totalPrice.toFixed(2)}`);
            console.log(`---------------------------------`);
        }
    }
    console.log(`---------------------------------`);
    console.log(`TOTAL: $${cart.totalPrice.toFixed(2)}`);
    console.log(`---------------------------------\n`);
}
// **********************************************************************************************************

// console.log('Start shopping\n');

// const cart = new Cart(); // Empty Cart

// displayCart(cart);

// // Select one MaroPizza with Pepperoni and Jalapeno selected from Options
// const pizzaOrder1 = new CartItem(MaroPizza, [Pepperoni, Jalapeno], 1);
// cart.addItem(pizzaOrder1);

// displayCart(cart);

// // Select two BBQPizza with Ketchup selected from Options
// const pizzaOrder2 = new CartItem(BBQPizza, [Ketchup], 2);
// cart.addItem(pizzaOrder2);
// console.log('Added 2 BBQ Chicken Pizzas to the cart.');

// displayCart(cart);