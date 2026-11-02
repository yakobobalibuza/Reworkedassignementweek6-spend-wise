
// ============================================
// SPENDWISE - INTERACTIVE BUDGET APPLICATION
// ============================================

// 1. SELECT HTML ELEMENTS (DOM MANIPULATION)

const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseDate = document.getElementById("expense-date");

const totalBudgetElement = document.getElementById("total-budget");
const totalExpensesElement = document.getElementById("total-expenses");
const remainingBalanceElement = document.getElementById("remaining-balance");
const transactionCountElement = document.getElementById("transaction-count");

const expenseList = document.getElementById("expense-list");
const recordCount = document.getElementById("record-count");

const budgetProgress = document.getElementById("budget-progress");
const budgetPercentage = document.getElementById("budget-percentage");
const budgetMessage = document.getElementById("budget-message");

const formMessage = document.getElementById("form-message");


// 2. INITIALIZE APPLICATION DATA

let budget = Number(localStorage.getItem("spendwiseBudget")) || 0;

// ARRAY: Stores multiple expense records.
let expenses = JSON.parse(localStorage.getItem("spendwiseExpenses")) || [];


// 3. FORMAT MONEY

function formatMoney(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// 4. SAVE DATA TO LOCAL STORAGE

function saveData() {
    localStorage.setItem("spendwiseBudget", budget);
    localStorage.setItem("spendwiseExpenses", JSON.stringify(expenses));
}


// 5. CALCULATE TOTAL EXPENSES USING A LOOP

function calculateTotalExpenses() {

    let total = 0;

    // LOOP: Goes through every expense in the array.
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}


// 6. UPDATE THE DASHBOARD

function updateDashboard() {

    const total = calculateTotalExpenses();
    const remaining = budget - total;

    // DOM MANIPULATION: Update dashboard values.
    totalBudgetElement.textContent = formatMoney(budget);
    totalExpensesElement.textContent = formatMoney(total);
    remainingBalanceElement.textContent = formatMoney(remaining);
    transactionCountElement.textContent = expenses.length;

    recordCount.textContent = expenses.length +
        (expenses.length === 1 ? " record" : " records");

    // CONDITIONAL STATEMENTS: Evaluate budget situations.

    if (budget <= 0) {

        budgetPercentage.textContent = "0%";
        budgetProgress.style.width = "0%";
        budgetProgress.style.background = "#7564ed";

        budgetMessage.textContent =
            "Please set your monthly budget to start tracking your expenses.";

        remainingBalanceElement.style.color = "#20243a";

    } else {

        const percentage = (total / budget) * 100;

        budgetPercentage.textContent = percentage.toFixed(1) + "%";
        budgetProgress.style.width = Math.min(percentage, 100) + "%";

        if (percentage >= 100) {

            budgetProgress.style.background = "#e34f4f";

            budgetMessage.textContent =
                "Warning! You have exceeded your budget. Review your spending.";

            remainingBalanceElement.style.color = "#e34f4f";

        } else if (percentage >= 80) {

            budgetProgress.style.background = "#ee944b";

            budgetMessage.textContent =
                "Be careful! You have used at least 80% of your monthly budget.";

            remainingBalanceElement.style.color = "#ee944b";

        } else {

            budgetProgress.style.background = "#20a56b";

            budgetMessage.textContent =
                "Great job! Your spending is within your budget. Keep saving!";

            remainingBalanceElement.style.color = "#20a56b";
        }

        if (remaining < 0) {
            budgetMessage.textContent +=
                " You are overspending by " + formatMoney(Math.abs(remaining)) + ".";
        }
    }

    // Update expense table whenever dashboard changes.
    displayExpenses();
}


// 7. DISPLAY EXPENSES USING A LOOP

function displayExpenses() {

    expenseList.innerHTML = "";

    // CONDITIONAL: Check whether there are any expenses.
    if (expenses.length === 0) {

        expenseList.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    No expenses recorded yet. Add your first expense!
                </td>
            </tr>
        `;

        return;
    }

    // LOOP: Display each expense from the array.
    for (let i = expenses.length - 1; i >= 0; i--) {

        const expense = expenses[i];

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(expense.name)}</td>
            <td>
                <span class="category-badge">
                    ${escapeHTML(expense.category)}
                </span>
            </td>
            <td>${escapeHTML(expense.date)}</td>
            <td>${formatMoney(expense.amount)}</td>
            <td>
                <button class="delete-button" data-id="${expense.id}">
                    Delete
                </button>
            </td>
        `;

        expenseList.appendChild(row);
    }
}


// 8. SAFELY DISPLAY USER-ENTERED TEXT

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


// 9. HANDLE BUDGET FORM SUBMISSION

budgetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    // CONDITIONAL: Validate budget.
    if (!Number.isFinite(newBudget) || newBudget <= 0) {

        alert("Please enter a valid budget greater than zero.");
        return;
    }

    budget = newBudget;

    saveData();
    updateDashboard();

    budgetInput.value = "";

    alert("Your monthly budget has been updated successfully!");
});


// 10. HANDLE ADDING NEW EXPENSES

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;

    // CONDITIONAL: Validate expense information.
    if (!name || !category || !date ||
        !Number.isFinite(amount) || amount <= 0) {

        showMessage("Please enter valid information in all fields.", "error");
        return;
    }

    // Create a new expense object.
    const newExpense = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    // ARRAY: Add the new record to the expenses array.
    expenses.push(newExpense);

    saveData();

    // Update the webpage.
    updateDashboard();

    expenseForm.reset();

    showMessage("Expense added successfully!", "success");
});


// 11. DELETE EXPENSES USING EVENT DELEGATION

expenseList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-button")) {

        const expenseId = event.target.dataset.id;

        const confirmed = confirm(
            "Are you sure you want to delete this expense?"
        );

        if (confirmed) {

            // ARRAY METHOD: Remove the selected expense.
            expenses = expenses.filter(function(expense) {
                return expense.id !== expenseId;
            });

            saveData();

            // Refresh the dashboard.
            updateDashboard();

            showMessage("Expense deleted successfully!", "success");
        }
    }
});


// 12. DISPLAY SUCCESS OR ERROR MESSAGES

function showMessage(message, type) {

    formMessage.textContent = message;
    formMessage.className = "form-message " + type;

}


// 13. SET DEFAULT DATE TO TODAY

const today = new Date();
const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

expenseDate.value = localDate;
expenseDate.max = localDate;


// 14. INITIALIZE THE DASHBOARD WHEN THE PAGE LOADS

updateDashboard();

saveData();

console.log("SpendWise application successfully initialized!");
