const express = require('express');
const cors = require('cors');
const router = express.Router();
const db = require('./db'); // Import your database connection
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

// Update the route to handle form submissions at /submit
router.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    // Validate the data (you should implement more robust validation)
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Insert the form data into the database
    const insertQuery = 'INSERT INTO admin_form (name, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Form data submitted successfully' });
    });
});

// Set the port number for your Express application
const port = 5000; // You can choose any available port

// Listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = router;
