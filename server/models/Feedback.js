const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    role: {
        type: String,
        default: 'Customer'
    },
    text: {
        type: String,
        required: [true, 'Please enter your feedback']
    },
    rating: {
        type: Number,
        required: [true, 'Please give a rating'],
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
