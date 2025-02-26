document.addEventListener("DOMContentLoaded", async () => {
    async function fetchBalance() {
        try {
            const response = await fetch("/api/balance");
            const data = await response.json();
            document.getElementById("balance").textContent = data.balance;
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }

    async function fetchTransactions() {
        try {
            const response = await fetch("/api/transactions");
            const transactions = await response.json();
            const transactionTable = document.getElementById("transactionTable");
            transactionTable.innerHTML = ""; // Clear old transactions

            transactions.forEach(tx => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${new Date(tx.date).toLocaleDateString()}</td>
                    <td>${tx.type}</td>
                    <td>$${tx.amount}</td>
                `;
                transactionTable.appendChild(newRow);
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }

    document.querySelector(".deposit-btn").addEventListener("click", async () => {
        let amount = parseFloat(document.getElementById("amount").value);
        if (amount > 0) {
            try {
                const response = await fetch("/api/deposit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount })
                });
                const result = await response.json();
                alert(result.message);
                fetchBalance();  // Refresh balance
                fetchTransactions(); // Refresh transaction history
            } catch (error) {
                console.error("Error depositing money:", error);
            }
        } else {
            alert("Enter a valid amount!");
        }
    });

    document.querySelector(".withdraw-btn").addEventListener("click", async () => {
        let amount = parseFloat(document.getElementById("amount").value);
        if (amount > 0) {
            try {
                const response = await fetch("/api/withdraw", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount })
                });
                const result = await response.json();
                alert(result.message);
                fetchBalance();
                fetchTransactions();
            } catch (error) {
                console.error("Error withdrawing money:", error);
            }
        } else {
            alert("Enter a valid amount!");
        }
    });

    // Load balance and transaction history on page load
    fetchBalance();
    fetchTransactions();
});
