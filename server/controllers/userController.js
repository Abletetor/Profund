import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// **Register User**
const registerUser = async (req, res) => {
   try {
      const { fullName, email, password, role } = req.body;

      // Validate input Fields
      if (!fullName || !email || !password || !role) {
         return res.status(400).json({ success: false, message: "Missing Details" });
      }
      if (!validator.isEmail(email)) {
         return res.status(400).json({ success: false, message: "Enter a valid email" });
      }
      if (password.length < 8) {
         return res.status(400).json({ success: false, message: "Enter a strong password (8+ characters)" });
      }

      // Validate Role
      if (!['creator', 'investor'].includes(role)) {
         return res.status(400).json({ success: false, message: "Invalid role" });
      }

      // Check if user exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ success: false, message: "User with this email already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
         fullName,
         email,
         role,
         password: hashedPassword
      };

      const newUser = new userModel(userData);
      const user = await newUser.save();

      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

      res.status(201).json({
         success: true,
         token,
         userData: {
            id: user._id,
            name: user.fullName,
            email: user.email,
            role: user.role
         }
      });

   } catch (error) {
      console.error("Error in Register: ", error);
      res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
   }
};


// **Login User**
const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ success: false, message: "Missing Details" });
      }

      // Find user
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      // Check for password Match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ success: false, message: "Invalid Credentials" });
      }

      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

      // Return user data with token
      res.status(200).json({
         success: true,
         token,
         userData: {
            id: user._id,
            name: user.fullName,
            email: user.email,
            role: user.role
         }
      });

   } catch (error) {
      console.error("Error in LoginUser: ", error);
      res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
   }
};


export {
   registerUser,
   loginUser,
};