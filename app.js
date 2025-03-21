const foodData = {
    "Apple": 52, "Banana": 89, "Orange": 47, "Strawberry": 32, "Broccoli": 34, "Chicken Breast": 165,
    "Egg": 155, "Carrot": 41, "Rice": 130, "Oats": 389, "Spinach": 23, "Tomato": 18, "Avocado": 160,
    "Potato": 77, "Beef": 250, "Salmon": 208, "Cheese": 402, "Yogurt": 59, "Almonds": 579,
    "Peanut Butter": 588, "Cucumber": 16, "Watermelon": 30, "Pineapple": 50, "Mango": 60
};

let totalCalories = 0;
const foodList = document.getElementById('food-list');

// Populate dropdown menu
const foodSelect = document.getElementById('food');
Object.keys(foodData).forEach(food => {
    const option = document.createElement('option');
    option.value = food;
    option.textContent = food;
    foodSelect.appendChild(option);
});

// Add food and update calorie count
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

    updateCaloriesAndBar();

    // Create list item with remove button
    const listItem = document.createElement('li');
    listItem.innerHTML = `${food} - <strong>${calories.toFixed(2)} kcal</strong>`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    
    removeBtn.addEventListener('click', function () {
        totalCalories -= calories;
        totalCalories = Math.max(0, totalCalories); // Prevent negative calories
        listItem.remove();
        updateCaloriesAndBar(); // Reduce bar when item removed
    });

    listItem.appendChild(removeBtn);
    foodList.appendChild(listItem);
});

function updateCaloriesAndBar() {
    document.getElementById('total-calories').textContent = totalCalories.toFixed(2);

    const barFill = document.getElementById('bar-fill');
    const maxCalories = 3000;
    const percentage = Math.min((totalCalories / maxCalories) * 100, 100);

    // Smoothly animate bar change
    requestAnimationFrame(() => {
        barFill.style.transition = "width 0.8s ease-in-out";
        barFill.style.width = percentage + "%";
    });

    // Change bar color based on calorie intake
    if (percentage < 25) {
        barFill.style.backgroundColor = "#66bb6a"; // Green
    } else if (percentage < 75) {
        barFill.style.backgroundColor = "#ffeb3b"; // Yellow
    } else {
        barFill.style.backgroundColor = "#f44336"; // Red
    }
}
