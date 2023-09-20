require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  // Import mongoose
const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Handle termination and disconnect from MongoDB
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

// Basic route
app.get('/', (req, res) => {
    res.send('Hello!');
});


const clothingsRoute = require('./routes/api/v1/clothings'); 
const ordersRoute = require('./routes/api/v1/orders');
const recommendationsRoute = require('./routes/api/v1/recommendations');
const subscriptionsRoute = require('./routes/api/v1/subscriptions');
const usersRoute = require('./routes/api/v1/users');

app.use('/api/v1/clothings', clothingsRoute);
app.use('/api/v1/orders', ordersRoute);
app.use('/api/v1/recommendations', recommendationsRoute);
app.use('/api/v1/subscriptions', subscriptionsRoute);
app.use('/api/v1/users', usersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
