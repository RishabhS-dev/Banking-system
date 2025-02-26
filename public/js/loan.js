document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload

        const loanAmount = document.getElementById("loanAmount").value;
        const loanType = document.getElementById("loanType").value;

        if (loanAmount <= 0 || isNaN(loanAmount)) {
            alert("Please enter a valid loan amount.");
            return;
        }

        alert(`Your ${loanType} application for ₹${loanAmount} has been submitted!`);
    });
});
