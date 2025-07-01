const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Neighborhood = require('./models/neighborhoodModel');
const data = require('./NeighborFit_Indian_Data.json');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected for seeding');

    await Neighborhood.deleteMany(); // clear existing data
    await Neighborhood.insertMany(data);

    console.log('✅ Neighborhoods seeded successfully with real Indian data');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
