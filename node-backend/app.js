const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Import the pg library for PostgreSQL
const userRoutes = require('./routes/userRoutes'); // Import your user routes
const cors = require('cors'); // Import the 'cors' middleware

const app = express();
const PORT = process.env.PORT || 3000;// port server can be accessed on

const corsOptions = {
    origin: 'http://localhost:4200', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Pass cookies, if any
    optionsSuccessStatus: 204, // No Content response for preflight requests
};
  
app.use(cors(corsOptions)); // Use the 'cors' middleware with options
  

// Middleware to convert incoming json data to be used as javascriptobject
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes); // Use the user routes for /api/users
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});