require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));



// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
});

// Model
const User = mongoose.model('User', userSchema);

//login api route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
    try {
    const user = await User.findOne({ email
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful' });
    } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register API route
app.post('/api/register', async (req, res) => {
  const { name, email, contact, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = new User({ name, email, contact, password });
    await newUser.save();
    res.json({ message: 'Registration successful' });
  } catch (err) {   
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
