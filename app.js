// List of foods and their calories per 100g
const foodData = {
    "Apple": 52,
    "Banana": 89,
    "Orange": 47,
    "Strawberry": 32,
    "Broccoli": 34,
    "Chicken Breast": 165,
    "Egg": 155,
    "Carrot": 41,
    "Rice": 130,
    "Oats": 389,
    "Spinach": 23,
    "Tomato": 18,
    "Avocado": 160,
    "Potato": 77,
    "Beef": 250,
    "Salmon": 208,
    "Cheese": 402,
    "Yogurt": 59,
    "Almonds": 579,
    "Peanut Butter": 588,
    "Cucumber": 16,
    "Watermelon": 30,
    "Pineapple": 50,
    "Mango": 60,
    "Lettuce": 15,
    "Bell Pepper": 20,
    "Zucchini": 17,
    "Peas": 81,
    "Kale": 49,
    "Cabbage": 25,
    "Green Beans": 31,
    "Coconut": 354,
    "Eggplant": 25,
    "Garlic": 149,
    "Onion": 40,
    "Cherries": 50,
    "Grapes": 69,
    "Raspberries": 52,
    "Blackberries": 43,
    "Blueberries": 57,
    "Papaya": 59,
    "Pomegranate": 83,
    "Mushrooms": 22,
    "Cantaloupe": 34,
    "Kiwi": 61,
    "Pear": 57,
    "Plum": 46,
    "Peach": 39,
    "Apricot": 48,
    "Dates": 277,
    "Prunes": 240,
    "Cashews": 553,
    "Walnuts": 654,
    "Hazelnuts": 628,
    "Macadamia Nuts": 718,
    "Chia Seeds": 486
};

let totalCalories = 0;
const foodList = document.getElementById('food-list');

// Populate the dropdown with food options
const foodSelect = document.getElementById('food');
Object.keys(foodData).forEach(food => {
    const option = document.createElement('option');
    option.value = food;
    option.textContent = food;
    foodSelect.appendChild(option);
});

// Calculate and update calorie count
document.getElementById('calculate-btn').addEventListener('click', function () {
    const food = foodSelect.value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    const caloriesPer100g = foodData[food];
    const calories = (caloriesPer100g * amount) / 100;

    totalCalories += calories;

    // Update calories display
    document.getElementById('calories').textContent = calories.toFixed(2);
    document.getElementById('total-calories').textContent = totalCalories.toFixed(2);

    // Update progress bar
    const barFill = document.getElementById('bar-fill');
    const maxCalories = 3000; // Maximum calories in the bar
    barFill.style.width = Math.min((totalCalories / maxCalories) * 100, 100) + '%';

    // Update progress bar color
    if (totalCalories <= maxCalories * 0.25) {
        barFill.style.backgroundColor = "#66bb6a"; // Green
    } else if (totalCalories <= maxCalories * 0.75) {
        barFill.style.backgroundColor = "#ffeb3b"; // Yellow
    } else {
        barFill.style.backgroundColor = "#f44336"; // Red
    }

    // Add food to the list with a remove button
    const listItem = document.createElement('li');
    listItem.textContent = `${food} - ${calories.toFixed(2)} kcal`;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    
    removeBtn.addEventListener('click', function () {
        totalCalories -= calories;
        document.getElementById('total-calories').textContent = totalCalories.toFixed(2);
        listItem.remove();
    });
    
    listItem.appendChild(removeBtn);
    foodList.appendChild(listItem);
});
