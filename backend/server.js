const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/user'); 

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://EiAether:project@data.9tbsu.mongodb.net/login?retryWrites=true&w=majority&appName=data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected successfully'); 
})
.catch((error) => {
    console.error('Database connection error:', error);
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Successful signup, please login' });
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Redirect to homepage (you can handle redirection in the frontend)
    res.status(200).json({ message: 'Login successful', user });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
