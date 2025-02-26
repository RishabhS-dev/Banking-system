document.addEventListener("DOMContentLoaded", () => {
    let balance = 5000;

    function updateBalance() {
        document.getElementById("balance").textContent = balance;
    }

    function addTransaction(type, amount) {
        const transactionTable = document.getElementById("transactionTable");
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${new Date().toLocaleDateString()}</td>
            <td>${type}</td>
            <td>$${amount}</td>
        `;
        transactionTable.appendChild(newRow);
    }

    window.deposit = function () {
        let amount = parseFloat(document.getElementById("amount").value);
        if (amount > 0) {
            balance += amount;
            updateBalance();
            addTransaction("Deposit", amount);
            alert(`$${amount} Deposited Successfully!`);
        } else {
            alert("Enter a valid amount!");
        }
    };

    window.withdraw = function () {
        let amount = parseFloat(document.getElementById("amount").value);
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            updateBalance();
            addTransaction("Withdraw", amount);
            alert(`$${amount} Withdrawn Successfully!`);
        } else {
            alert("Insufficient Balance or Invalid Amount!");
        }
    };
});
