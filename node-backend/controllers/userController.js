const User = require('../models/User');
const bcrypt = require('bcrypt'); // Import bcrypt library

const userController = {
  async register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    // console.log('Received data:', req.body);

    try {
        // Check if the email is already in use
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already in use' });
        }else{
  
        // Hash the password using bcrypt
        const saltRounds = 10; // You can adjust the number of salt rounds for security
        const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Add the user to the database
      const user = await User.addUser(firstName, lastName, email, hashedPassword);

      // Respond with the newly created user data (excluding the password)
      res.status(201).json({
        message: 'User registered successfully',
        status: "success",
        // user: {
        //   user_id: user.user_id,
        //   firstname: user.firstName,
        //   lastname: user.lastName,
        //   email: user.email,
        //   createdate: user.createdate,
        // },
      });
    }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
  
    try {
      // Check the user on the database
      const user = await User.findByEmail(email);
  
      if (!user) {
        res.status(401).json({
          error: 'Invalid credentials',
          status: 'false',
        });
        return; // Exit the function early if the user is not found
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        console.log("Password matched");
        // Passwords match, you can proceed with the login logic
        res.status(200).json({
          message: 'User logged in successfully',
          status: "success",
        });
      } else {
        console.log("Password does not match");
        // Passwords do not match
        res.status(401).json({
          error: 'Invalid credentials',
          status: "false",
        });
      }
    } catch (error) {
      console.error('Error logging user in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = userController;