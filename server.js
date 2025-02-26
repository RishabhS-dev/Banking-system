const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL Database");
});

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Route: Get Account Balance
app.get("/api/balance", (req, res) => {
    db.query("SELECT balance FROM accounts WHERE id = 1", (err, result) => {
        if (err) {
            console.error("❌ Error fetching balance:", err);
            return res.status(500).json({ error: "Server error" });
        }
        res.json({ balance: result[0]?.balance || 0 });
    });
});

// ✅ Route: Deposit Money
app.post("/api/deposit", (req, res) => {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "❌ Invalid amount" });
    }

    db.query("UPDATE accounts SET balance = balance + ? WHERE id = 1", [amount], err => {
        if (err) {
            console.error("❌ Deposit error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        db.query("INSERT INTO transactions (account_id, type, amount) VALUES (1, 'Deposit', ?)", [amount], () => {
            res.json({ message: `✅ ₹${amount} Deposited Successfully!` });
        });
    });
});

// ✅ Route: Withdraw Money
app.post("/api/withdraw", (req, res) => {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "❌ Invalid amount" });
    }

    db.query("SELECT balance FROM accounts WHERE id = 1", (err, result) => {
        if (err) {
            console.error("❌ Withdraw error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        const currentBalance = result[0]?.balance || 0;

        if (currentBalance < amount) {
            return res.status(400).json({ message: "❌ Insufficient balance" });
        }

        db.query("UPDATE accounts SET balance = balance - ? WHERE id = 1", [amount], err => {
            if (err) {
                console.error("❌ Withdraw error:", err);
                return res.status(500).json({ message: "Server error" });
            }
            db.query("INSERT INTO transactions (account_id, type, amount) VALUES (1, 'Withdraw', ?)", [amount], () => {
                res.json({ message: `✅ ₹${amount} Withdrawn Successfully!` });
            });
        });
    });
});

// ✅ Route: Get Transaction History
app.get("/api/transactions", (req, res) => {
    db.query("SELECT * FROM transactions WHERE account_id = 1 ORDER BY id DESC", (err, result) => {
        if (err) {
            console.error("❌ Error fetching transactions:", err);
            return res.status(500).json({ error: "Server error" });
        }
        res.json(result);
    });
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
