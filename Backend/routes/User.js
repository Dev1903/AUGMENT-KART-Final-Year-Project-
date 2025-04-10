import express from "express";
import multer from "multer";
import User from '../model/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from 'dotenv';

// Add User
const userUpload = multer({ storage });

// Ensure bcrypt is imported

router.post("/addUser", async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json("User already exists. Please log in.");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Store hashed password
      address: req.body.address,
      mobile: req.body.mobile,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json("User Successfully Inserted");
  } catch (error) {
    console.error("Error while adding user:", error);
    res.status(500).json("Error While Adding User");
  }
});

// Update User
router.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, address, mobile, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User Not Found");
    }

    // Update fields if they are provided, otherwise retain current values
    user.name = firstName && lastName ? `${firstName} ${lastName}` : user.name;
    user.address = address || user.address;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;

    await user.save(); // Save updated user
    res.status(200).json("User Successfully Updated");
  } catch (error) {
    console.error("Error While Updating User:", error);
    res.status(500).json("Error While Updating User");
  }
});


// Login User
router.post("/loginUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin credentials are used
    const isAdmin = username === process.env.ADMIN_USERNAME;
    
    const isAdminMatch = isAdmin ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD) : false;

    // If admin credentials are correct, respond with 201
    if (isAdmin && isAdminMatch) {
      return res.status(201).json({ message: "Admin logged in successfully" });
    }
    const user = await User.findOne({
      $or: [{ email: username }, { mobile: username }],
    });

    // Check if user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    

    // Check normal user password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT for normal user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json(token);
  } catch (error) {
    console.error(error); // Log any errors for debugging
    return res.status(500).send("Server error");
  }
});

// Fetch a specific user by their userId
router.get("/getUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    //console.log(userId); // Get the userId from the request parameters
    const user = await User.findById(userId); // Fetch user from the database using the userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return user details as JSON
  } catch (error) {
    console.error("Error while fetching user:", error);
    res.status(500).json({ message: "Error while fetching user" });
  }
});


export default router;