const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();

// ✅ Correct CORS configuration
app.use(cors({
    origin: "https://neighbor-fit-app.vercel.app", // your Vercel frontend URL
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Example Route
app.get('/', (req, res) => {
    res.send('NeighborFit API is running 🚀');
});

// Placeholder API routes
const matchRoutes = require('./routes/matchRoutes');
app.use('/api/match', matchRoutes);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
