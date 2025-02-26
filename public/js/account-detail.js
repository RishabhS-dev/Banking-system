document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const accountId = params.get("id") || 1; // Default to account ID 1 if not provided

    try {
        // Fetch account details
        const accountResponse = await fetch(`/api/account/${accountId}`);
        const accountData = await accountResponse.json();

        if (accountData.error) {
            document.body.innerHTML = `<h2>Account Not Found</h2>`;
            return;
        }

        document.querySelector("strong:nth-of-type(1)").innerText = `Account Number: ${accountData.account_number}`;
        document.querySelector("strong:nth-of-type(2)").innerText = `Holder Name: ${accountData.holder_name}`;
        document.getElementById("balance").innerText = `₹${accountData.balance}`;

        // Fetch transaction history
        const transactionsResponse = await fetch(`/api/transactions/${accountId}`);
        const transactions = await transactionsResponse.json();
        const transactionList = document.getElementById("transaction-list");

        transactionList.innerHTML = ""; // Clear existing transactions
        transactions.forEach(txn => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${txn.type}</td>
                <td>₹${txn.amount}</td>
                <td>${new Date(txn.timestamp).toLocaleString()}</td>
            `;
            transactionList.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching account details:", error);
    }
});

// ✅ Deposit Function
async function deposit() {
    const amount = document.getElementById("amount").value;
    if (!amount || amount <= 0) {
        alert("Enter a valid amount!");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const accountId = params.get("id") || 1;

    try {
        const response = await fetch("/api/deposit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accountId, amount })
        });

        const data = await response.json();
        alert(data.message);
        window.location.reload(); // Refresh balance & transactions
    } catch (error) {
        console.error("Deposit error:", error);
    }
}

// ✅ Withdraw Function
async function withdraw() {
    const amount = document.getElementById("amount").value;
    if (!amount || amount <= 0) {
        alert("Enter a valid amount!");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const accountId = params.get("id") || 1;

    try {
        const response = await fetch("/api/withdraw", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accountId, amount })
        });

        const data = await response.json();
        alert(data.message);
        window.location.reload(); // Refresh balance & transactions
    } catch (error) {
        console.error("Withdraw error:", error);
    }
}
