const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/User');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health Check / Keep-Alive Route
app.get('/ping', (req, res) => {
    res.status(200).send('Server is awake!');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('MongoDB Connected Successfully');
    
    // Create or Update admin user
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
        await User.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin'
        });
        console.log('Admin user created');
    } else {
        // Update admin if credentials changed
        adminUser.email = process.env.ADMIN_EMAIL;
        adminUser.password = process.env.ADMIN_PASSWORD;
        await adminUser.save();
        console.log('Admin credentials updated');
    }
}).catch(err => {
    console.error('MongoDB Connection Error:', err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
