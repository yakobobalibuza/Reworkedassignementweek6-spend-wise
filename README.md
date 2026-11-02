
# SpendWise – Interactive Budgeting Application

## 1. Project Description

SpendWise is a simple and interactive personal budgeting application developed using HTML, CSS, and JavaScript.

The application helps users manage their monthly budgets, record daily expenses, monitor their spending, and understand how much money remains available.

The main goal of this project is to demonstrate how JavaScript can make a webpage interactive through decision-making, arrays, loops, DOM manipulation, and event handling.

## 2. Technologies Used

- HTML5 – Used to structure the application.
- CSS3 – Used to style the dashboard and make it responsive.
- JavaScript – Used to implement application logic and interactivity.
- Browser Local Storage – Used to save budget and expense records.

## 3. Improvements Made This Week

Several improvements were made to the SpendWise application:

1. Added a monthly budget feature that allows users to set and update their spending limits.
2. Added an expense form for recording expense names, amounts, categories, and dates.
3. Created dashboard statistics showing total budget, total expenses, remaining balance, and number of transactions.
4. Added a budget progress bar to help users monitor their spending.
5. Implemented automatic budget warnings when spending reaches 80% or exceeds 100% of the budget.
6. Added an expense table to display recorded transactions.
7. Implemented a delete feature to remove unwanted expense records.
8. Added Local Storage so information remains available after refreshing the browser.
9. Improved the interface with a modern, clean, and responsive design.

## 4. How Conditionals Are Used

Conditional statements allow JavaScript to make decisions based on different situations.

In SpendWise, `if`, `else if`, and `else` statements are used to evaluate the user's budget and expenses.

For example:

```javascript
if (percentage >= 100) {
    budgetMessage.textContent =
        "Warning! You have exceeded your budget.";
} else if (percentage >= 80) {
    budgetMessage.textContent =
        "Be careful! You have used at least 80% of your budget.";
} else {
    budgetMessage.textContent =
        "Great job! Your spending is within your budget.";
}
```

These conditions provide different feedback depending on the user's spending level.

Conditionals are also used to validate user inputs and check whether expense records exist.

## 5. How Arrays Are Used

Arrays are used to store and manage multiple expense records instead of creating separate variables for every expense.

Example:

```javascript
let expenses = [];

const newExpense = {
    id: Date.now().toString(),
    name: "Groceries",
    amount: 500,
    category: "Food",
    date: "2026-11-02"
};

expenses.push(newExpense);
```

The `expenses` array stores multiple expense objects.

JavaScript array methods such as `push()` and `filter()` are used to add and remove expense records.

## 6. How Loops Are Used

Loops are used to process multiple expense records efficiently.

For example:

```javascript
function calculateTotalExpenses() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}
```

The `for` loop goes through each expense in the array and calculates the total amount spent.

Another loop is used to display all recorded expenses in the dashboard.

## 7. How DOM Manipulation Is Used

DOM manipulation allows JavaScript to update the webpage dynamically without requiring the user to reload it.

SpendWise uses methods such as:

- `document.getElementById()` to select HTML elements.
- `document.createElement()` to create new table rows.
- `textContent` to update dashboard information.
- `innerHTML` to display expense records.
- `appendChild()` to add new rows to the expense table.
- `style.width` to update the budget progress bar.

For example:

```javascript
totalExpensesElement.textContent = formatMoney(total);
```

This updates the total expenses displayed on the dashboard.

## 8. How User Interactions Are Handled Through Events

Event listeners allow users to interact with SpendWise.

The application uses:

- `submit` events to handle budget and expense forms.
- `click` events to handle deleting expenses.
- `preventDefault()` to prevent forms from refreshing the page.
- `confirm()` to ask users to confirm before deleting expenses.

Example:

```javascript
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Process the user's expense information.
});
```

When a user submits the expense form, JavaScript processes the information, adds it to the expenses array, saves the data, and updates the dashboard.

## 9. Data Persistence

Local Storage is used to save the user's budget and expense information in the browser.

Example:

```javascript
localStorage.setItem(
    "spendwiseExpenses",
    JSON.stringify(expenses)
);
```

The application retrieves saved records when the page loads:

```javascript
let expenses = JSON.parse(
    localStorage.getItem("spendwiseExpenses")
) || [];
```

This ensures that the information is not lost when the browser page is refreshed.

## 10. Challenges Encountered and Solutions

### Challenge 1: Calculating Total Expenses

Initially, managing multiple expense records and calculating their total could become complicated.

**Solution:** I used an array to store expense objects and a `for` loop to calculate the total automatically.

### Challenge 2: Updating Dashboard Information

Another challenge was ensuring that dashboard statistics changed whenever a user added or deleted an expense.

**Solution:** I created an `updateDashboard()` function that recalculates and updates all dashboard information whenever the expense data changes.

### Challenge 3: Budget Monitoring

It was necessary to provide users with feedback when they approached or exceeded their monthly budget.

**Solution:** I implemented conditional statements to check spending percentages and display appropriate warning messages.

### Challenge 4: Saving Information

Refreshing the browser could cause information to disappear if it was only stored in JavaScript variables.

**Solution:** I implemented Local Storage to preserve the budget and expense records in the browser.

### Challenge 5: Making the Application Responsive

The dashboard needed to work on different screen sizes.

**Solution:** I used CSS media queries and flexible layouts to make the application responsive on desktop, tablet, and mobile devices.

## 11. How to Run the Project

1. Download or clone the SpendWise repository.
2. Open the project folder in Visual Studio Code.
3. Ensure that all four files are in the same folder:
   - index.html
   - style.css
   - script.js
   - README.md
4. Open `index.html` in a web browser.
5. Alternatively, use the Live Server extension in Visual Studio Code.
6. Set a monthly budget and start adding expenses.

## 12. Conclusion

SpendWise demonstrates how HTML, CSS, and JavaScript work together to create an interactive web application.

Through this project, I applied conditional statements, arrays, loops, DOM manipulation, and event listeners to solve a practical problem related to personal financial management.

The project helped me improve my understanding of JavaScript and how it can be used to build useful and interactive applications.

---

**Project Name:** SpendWise

**Project Type:** Interactive Budgeting Application

**Developer:** Balibuza Jacob

**Technologies:** HTML, CSS, JavaScript
