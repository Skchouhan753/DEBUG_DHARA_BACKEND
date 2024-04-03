const mongoose = require('mongoose');

// Define the schema for the blacklisted tokens
const BlackListUserSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h' // Automatically remove documents after 24 hours
    }
});

const BlackListUserModel = mongoose.model('BlackListUser', BlackListUserSchema);

module.exports = { BlackListUserModel };
