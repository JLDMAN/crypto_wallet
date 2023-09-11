const User = require("../models/User");
const bcrypt = require("bcrypt"); // Import bcrypt library
const jwt = require("jsonwebtoken");

const userController = {
  async register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    // console.log('Received data:', req.body);

    try {
      // Check if the email is already in use
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // You can adjust the number of salt rounds for security
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Add the user to the database
        const user = await User.addUser(
          firstName,
          lastName,
          email,
          hashedPassword
        );

        const trading = await User.initiateFunds(user.user_id);

        // Respond with the newly created user data (excluding the password)
        res.status(201).json({
          message: "User registered successfully",
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
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Check for the user on the database
      const user = await User.findByEmail(email);

      if (!user) {
        res.status(401).json({
          error: "Invalid credentials",
          status: "false",
        });
        // Exit the function early if the user is not found
        return;
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      // const user = user.user_id;

      if (passwordMatch) {
        console.log("Password matched");

        const token = jwt.sign(
          { userId: user.user_id },
          "tv7f7564dF%F^DDE65F75DR6CRfdc86ri",
          {
            expiresIn: "0.5h", // Set the token expiration time
          }
        );

        res.status(200).json({
          message: "User logged in successfully",
          status: "success",
          token: token,
          user: user.first_name,
          email:user.email
        });
      } else {
        // Passwords do not match
        res.status(401).json({
          error: "Invalid credentials",
          status: "false",
        });
      }
    } catch (error) {
      console.error("Error logging user in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
