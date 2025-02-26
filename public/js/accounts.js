document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/accounts")
        .then(response => response.json())
        .then(accounts => {
            const table = document.querySelector("table");
            table.innerHTML = `
                <tr>
                    <th>Account Number</th>
                    <th>Holder Name</th>
                    <th>Balance</th>
                    <th>Actions</th>
                </tr>
            `; // Reset table headers

            accounts.forEach(account => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${account.account_number}</td>
                    <td>${account.holder_name}</td>
                    <td>₹${account.balance}</td>
                    <td><a href="account-details.html?id=${account.id}">View</a></td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading accounts:", error));
});
