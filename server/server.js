const express = require('express');
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());           // Enable CORS
app.use(express.json());   // Parse JSON bodies
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
 
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(401).json({ message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from the RUHousing Express server!');
});

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
