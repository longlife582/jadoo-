const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true
}));

app.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log("Signup request received");

  try {
    if (!first_name) throw Error("Please insert your first name");
    if (!last_name) throw Error("Please insert your last name");
    if (!email) throw Error("Please insert your email");
    if (!password) throw Error("Please insert your password");

    // Check if the email already exists in the database
    const existingUser = await db.execute(
      "SELECT * FROM auth WHERE email = ?",
      [email]
    );
    if (existingUser[0].length > 0) {
      throw Error("Email already exists. Please choose a different email.");
    }

    const id = uuid.v4();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let sql = `INSERT INTO auth (id, first_name, last_name, email, password)
                 VALUES (?, ?, ?, ?, ?)`;

    await db.execute(sql, [id, first_name, last_name, email, hash]);
    res.status(200).json({ message: "Your account has been created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) throw Error('Please insert your email');
    if (!password) throw Error('Please insert your password');

    // Check if the email and password match the user in the database
    const user = await db.execute('SELECT * FROM auth WHERE email = ?', [email]);

    if (user[0].length === 0) {
      throw Error('Invalid email or password');
    }

    const { id, first_name, last_name, password: storedPassword } = user[0][0];

    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
      throw Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ id, first_name, last_name, token, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


  // ...

// ...

app.patch('/changepassword', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!email) throw Error('Please insert your email');
    if (!newPassword) throw Error('Please insert your new password');

    // Check if the email exists in the database
    const user = await db.execute('SELECT * FROM auth WHERE email = ?', [email]);

    if (user[0].length === 0) {
      throw Error('Email not found. Please enter a valid email.');
    }

    // Update the user's password in the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const sql = 'UPDATE auth SET password = ? WHERE email = ?';
    await db.execute(sql, [hash, email]);

    res.status(200).json({ message: 'Password has been changed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ...
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user information from the database based on the provided ID
    const user = await db.execute('SELECT * FROM auth WHERE id = ?', [id]);

    if (user[0].length === 0) {
      throw Error('User not found.');
    }

    const { first_name, last_name } = user[0][0];
    res.status(200).json({ id, first_name, last_name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ...


  
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
