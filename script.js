// ==== SWITCH VIEW ====
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const incomeContent = document.getElementById("incomeContent");
const expenseContent = document.getElementById("expenseContent");

incomeBtn.onclick = () => {
  incomeBtn.classList.add("active");
  expenseBtn.classList.remove("active");
  incomeContent.classList.add("active");
  expenseContent.classList.remove("active");
};
expenseBtn.onclick = () => {
  expenseBtn.classList.add("active");
  incomeBtn.classList.remove("active");
  expenseContent.classList.add("active");
  incomeContent.classList.remove("active");
};

// ==== INCOME LOGIC ====
const incomeItem = document.getElementById("income-item");
const incomeAmount = document.getElementById("income-amount");
const incomeCategory = document.getElementById("income-category");
const incomeAdd = document.getElementById("income-add");
const incomeList = document.getElementById("income-list");
const incomeTotal = document.getElementById("income-total");

let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
function updateIncomeList() {
  incomeList.innerHTML = "";
  let total = 0;
  incomes.forEach((inc, i) => {
    total += inc.amount;
    const li = document.createElement("li");
    li.innerHTML = `${inc.item} $${inc.amount.toFixed(2)} (${inc.category})
          <button class="btn-delete" onclick="deleteIncome(${i})"> X </button>`;
    incomeList.appendChild(li);
  });
  incomeTotal.textContent = total.toFixed(2);
  localStorage.setItem("incomes", JSON.stringify(incomes));
}
window.deleteIncome = (i) => {
  incomes.splice(i, 1);
  updateIncomeList();
};
incomeAdd.onclick = () => {
  const item = incomeItem.value.trim();
  const amount = parseFloat(incomeAmount.value);
  const category = incomeCategory.value;
  if (!item || !amount) {
    alert("Fill both fields");
    return;
  }
  incomes.push({ item, amount, category });
  incomeItem.value = "";
  incomeAmount.value = "";
  updateIncomeList();
};
updateIncomeList();

// ==== EXPENSE LOGIC ====
const expenseItem = document.getElementById("expense-item");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseAdd = document.getElementById("expense-add");
const expenseList = document.getElementById("expense-list");
const expenseTotal = document.getElementById("expense-total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
function updateExpenseList() {
  expenseList.innerHTML = "";
  let total = 0;
  expenses.forEach((exp, i) => {
    total -= exp.amount;
    const li = document.createElement("li");
    li.innerHTML = `${exp.item} $${exp.amount.toFixed(2)} (${exp.category})
          <button class="btn-delete" onclick="deleteExpense(${i})"> X </button>`;
    expenseList.appendChild(li);
  });
  expenseTotal.textContent = total.toFixed(2);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
window.deleteExpense = (i) => {
  expenses.splice(i, 1);
  updateExpenseList();
};
expenseAdd.onclick = () => {
  const item = expenseItem.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;
  if (!item || !amount) {
    alert("Fill both fields");
    return;
  }
  expenses.push({ item, amount, category });
  expenseItem.value = "";
  expenseAmount.value = "";
  updateExpenseList();
};
updateExpenseList();
