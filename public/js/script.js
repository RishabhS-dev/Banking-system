<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
    alert("Welcome to the Banking System!");

    const balanceElement = document.getElementById("balance");

    if (balanceElement) {
        fetch("/api/balance")
            .then(response => response.json())
            .then(data => {
                balanceElement.innerText = `₹${data.balance}`;
            })
            .catch(error => console.error("Error fetching balance:", error));
    }
});
=======
document.addEventListener("DOMContentLoaded", function() {
    alert("Welcome to the Banking System!");
});
>>>>>>> d9bbac117c9fa3eb376b9af030592607062b0788
