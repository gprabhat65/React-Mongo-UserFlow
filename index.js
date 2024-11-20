import express from 'express';
import mongoose from 'mongoose';
import User from './user.model.js'; // User model
import bcrypt from 'bcrypt'; // For password hashing
import cors from 'cors'; // For handling CORS

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Replace this with your frontend's address
    credentials: true,               // Allow credentials
}));

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Database connection
const con = "mongodb://localhost:27017/testapp";
mongoose.connect(con, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Failed to connect to MongoDB'));

// Basic GET request
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// User Registration Endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        if (error.code === 11000) { // Duplicate email
            return res.status(400).json({ message: "Email is already in use" });
        }
        res.status(500).json({ message: error.message });
    }
});
