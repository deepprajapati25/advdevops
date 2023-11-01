let totalAmount = document.getElementById("total-amt")
let userAmount = document.getElementById("expense-amt")
const checkAmountButton = document.getElementById("check-amt")
const totalAmountButton = document.getElementById("total-amt-button")
const expenseTitle = document.getElementById("expense-title")
const errorMessage = document.getElementById("budget-error")
const expenseTitleError = document.getElementById("expense-title-error")
const expenseAmountError = document.getElementById("expense-amt-error")
const amount = document.getElementById("amount")
const expenditureValue = document.getElementById("expend-value")
const balanceValue = document.getElementById("balance-amt")
const list = document.getElementById("list")
let tempAmount = 0

// Budget function
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide")
    }
    else {
        errorMessage.classList.add("hide")
        amount.innerHTML = tempAmount
        balanceValue.innerText = tempAmount - expenditureValue.innerText
        totalAmount.value = ""
    }
})

// Disable, edit and delete button function
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit")
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool 
    })
}

// Modify list elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement
    let currentBalance = balanceValue.innerText
    let currentExpense = expenditureValue.innerText
    let parentAmount = parentDiv.querySelector(".amount").innerText
    if(edit) {
        let parentText = parentDiv.querySelector(".product").innerText
        expenseTitle.value = parentText
        userAmount.value = parentAmount
        disableButtons(true) 
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount)
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount)
    parentDiv.remove()
}

// Create list function
const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div")
    subListContent.classList.add("sublist-content", "flex-space")
    list.appendChild(subListContent)
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`
    let editButton = document.createElement("button")
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit")
    editButton.style.fontSize = "1.2em"
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true)
    })
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete")
    deleteButton.style.fontSize = "1.2em"
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton)
    })
    subListContent.appendChild(editButton)
    subListContent.appendChild(deleteButton)
    document.getElementById("list").appendChild(subListContent)
}

// Add Expenses 
checkAmountButton.addEventListener("click", () => {
    if(!userAmount.value || !expenseTitle.value) {
        expenseTitleError.classList.remove("hide")
        return false
    }
    disableButtons(false)
    let expenditure = parseInt(userAmount.value)
    let sum = parseInt(expenditureValue.innerText) + expenditure
    expenditureValue.innerText = sum
    const totalBalance = tempAmount - sum
    balanceValue.innerText = totalBalance
    listCreator(expenseTitle.value, userAmount.value)
    expenseTitle.value = ""
    userAmount.value = ""
})