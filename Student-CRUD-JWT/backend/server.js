// const express = require('express');
// const mysql2 = require('mysql2');
// const cors = require('cors');
// const app = express();

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const JWT_SECRET = 'your_jwt_secret_key'; // Change to env variable for production


// // Database connection
// const db = mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Sekhar@25',
//     database: 'studentdb'
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to the database
// db.connect(err => {
//     if (err) {
//         console.log("Database connection failed: " + err.stack);
//         return;
//     }
//     console.log("Database connected");
// });

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }


// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// // Create a student
// app.post('/students', authenticateToken,(req, res) => {
//     const { name, email, course, address, mobile, dob } = req.body;
//     const sql = 'INSERT INTO students (name, email, course, address, mobile, dob) VALUES (?, ?, ?, ?, ?, ?)';
    
//     db.query(sql, [name, email, course, address, mobile, dob], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Error adding student' });
//         }
//         res.status(201).json({ message: "Student added successfully" });
//     });
// });

// // Get all students
// app.get('/students', authenticateToken, (req, res) => {
//     db.query('SELECT * FROM students', (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Error fetching data" });
//         }
//         res.json(result);
//     });
// });

// // Update a student
// app.put('/students/:id', authenticateToken, (req, res) => {
//     const { name, email, course, address, mobile, dob } = req.body;
//     const { id } = req.params;

//     const sql = "UPDATE students SET name = ?, email = ?, course = ?, address = ?, mobile = ?, dob = ? WHERE id = ?";
//     db.query(sql, [name, email, course, address, mobile, dob, id], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Error updating data" });
//         }
//         res.json({ message: "Student updated successfully", data: result });
//     });
// });

// // Delete a student
// app.delete('/students/:id', authenticateToken, (req, res) => {
//     const { id } = req.params;
//     const sql = 'DELETE FROM students WHERE id = ?';

//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Error deleting student" });
//         }
//         res.status(200).json({ message: "Student deleted successfully" });
//     });
// });

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     db.query(sql, [username, hashedPassword], (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'User already exists or DB error' });
//       }
//       res.status(201).json({ message: 'User registered successfully' });
//     });
//   });
//   // Duplicate declaration removed as JWT_SECRET is already declared at the top of the file
  
//   app.post('/login', (req, res) => {
//     const { username, password } = req.body;
  
//     const sql = 'SELECT * FROM users WHERE username = ?';
//     db.query(sql, [username], async (err, results) => {
//       if (err) return res.status(500).json({ message: 'Server error' });
//       if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
  
//       const user = results[0];
//       const valid = await bcrypt.compare(password, user.password);
//       if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  
//       const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//     });
//   });
    

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     const sql = 'SELECT * FROM users WHERE username = ?';
//     db.query(sql, [username], async (err, results) => {
//         if (err) return res.status(500).json({ message: 'DB error' });
//         if (results.length === 0) return res.status(400).json({ message: 'User not found' });

//         const user = results[0];
//         const match = await bcrypt.compare(password, user.password);

//         if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     });
// });


const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

const JWT_SECRET = 'your_jwt_secret_key'; // Change to env variable for production

// Database connection
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sekhar@25',
    database: 'studentdb'
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
db.connect(err => {
    if (err) {
        console.log("Database connection failed: " + err.stack);
        return;
    }
    console.log("Database connected");
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Login route (corrected)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        if (results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Create a student
app.post('/students', authenticateToken, (req, res) => {
    const { name, email, course, address, mobile, dob } = req.body;
    const sql = 'INSERT INTO students (name, email, course, address, mobile, dob) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [name, email, course, address, mobile, dob], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error adding student' });
        }
        res.status(201).json({ message: "Student added successfully" });
    });
});

// Get all students
app.get('/students', authenticateToken, (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching data" });
        }
        res.json(result);
    });
});

// Update a student
app.put('/students/:id', authenticateToken, (req, res) => {
    const { name, email, course, address, mobile, dob } = req.body;
    const { id } = req.params;

    const sql = "UPDATE students SET name = ?, email = ?, course = ?, address = ?, mobile = ?, dob = ? WHERE id = ?";
    db.query(sql, [name, email, course, address, mobile, dob, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating data" });
        }
        res.json({ message: "Student updated successfully", data: result });
    });
});

// Delete a student
app.delete('/students/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM students WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error deleting student" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    });
});

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'User already exists or DB error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
