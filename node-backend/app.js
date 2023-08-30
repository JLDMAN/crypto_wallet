const express = require('express');
const bodyParser = require('body-parser');
// Import the pg library for PostgreSQL
const { Pool } = require('pg'); 
// Import your user routes
const userRoutes = require('./routes/userRoutes'); 
// Import the 'cors' middleware
const cors = require('cors'); 

const app = express();
// port server can be accessed on
const PORT = process.env.PORT || 3000;

const corsOptions = {
    // Accepting requests from this url
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // Pass cookies, if any
    credentials: true, 
    // No Content response for preflight requests
    optionsSuccessStatus: 204, 
};
  
// Use the 'cors' middleware with options
app.use(cors(corsOptions)); 
// Middleware to convert incoming json data to be used as javascriptobject
app.use(bodyParser.json());
// Use the user routes for /api/users
app.use('/api/users', userRoutes); 
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});