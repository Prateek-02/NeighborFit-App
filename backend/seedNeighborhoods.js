const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Neighborhood = require('./models/neighborhoodModel');

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB connected for seeding");

    const neighborhoods = [
        {
            name: "Koramangala",
            city: "Bangalore",
            state: "Karnataka",
            averageRent: 25000, // INR per month
            safetyScore: 80,
            walkabilityScore: 85,
            publicTransportScore: 75,
            familyFriendlyScore: 70
        },
        {
            name: "Hinjewadi",
            city: "Pune",
            state: "Maharashtra",
            averageRent: 18000,
            safetyScore: 78,
            walkabilityScore: 60,
            publicTransportScore: 65,
            familyFriendlyScore: 80
        },
        {
            name: "Gachibowli",
            city: "Hyderabad",
            state: "Telangana",
            averageRent: 22000,
            safetyScore: 82,
            walkabilityScore: 70,
            publicTransportScore: 72,
            familyFriendlyScore: 85
        },
        {
            name: "Salt Lake",
            city: "Kolkata",
            state: "West Bengal",
            averageRent: 20000,
            safetyScore: 75,
            walkabilityScore: 80,
            publicTransportScore: 78,
            familyFriendlyScore: 77
        },
        {
            name: "Connaught Place",
            city: "Delhi",
            state: "Delhi",
            averageRent: 30000,
            safetyScore: 70,
            walkabilityScore: 90,
            publicTransportScore: 85,
            familyFriendlyScore: 60
        }
    ];


    await Neighborhood.deleteMany({});
    await Neighborhood.insertMany(neighborhoods);

    console.log("Neighborhoods seeded successfully");
    process.exit();
})
.catch((err) => {
    console.error(err);
    process.exit(1);
});
