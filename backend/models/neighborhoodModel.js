const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: String,
    state: String,
    averageRent: Number,
    safetyScore: Number, // 0-100
    walkabilityScore: Number, // 0-100
    publicTransportScore: Number, // 0-100
    familyFriendlyScore: Number, // 0-100
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);
