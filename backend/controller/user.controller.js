import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

// ✅ User Registration
export const register = async (req, res) => {
  try {
    // Check if photo is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User Photo is Required!" });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({ message: "Invalid photo format. Only JPG and PNG are allowed." });
    }

    // Validate other fields
    const { email, name, password, phone, education, role } = req.body;
    if (!email || !name || !password || !phone || !education || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log("Cloudinary Upload Error:", cloudinaryResponse.error);
      return res.status(500).json({ message: "Image upload failed." });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    // Save user in DB
    await newUser.save();

    // Generate Token & Set Cookies
    const token = await createTokenAndSaveCookies(newUser._id, res);

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        photo: newUser.photo,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ User Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate Inputs
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Find User by Email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Validate Role
    if (user.role !== role) {
      return res.status(403).json({ message: `Role mismatch: Expected ${user.role}, but got ${role}` });
    }

    // Generate Token & Set Cookies
    const token = await createTokenAndSaveCookies(user._id, res);

    res.status(200).json({
      message: "User logged in successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ User Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get User Profile
export const getMyProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get All Admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "Admin" });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Get Admins Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const user = req.user; // From isAuthenticated middleware
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, email, phone, education, password } = req.body;
    let photoUpdate = {};

    // Handle photo upload if provided
    if (req.files && req.files.photo) {
      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
        return res.status(400).json({ message: "Invalid photo format. Only JPG, PNG, and WEBP are allowed." });
      }

      // Delete old photo from Cloudinary if it exists
      if (user.photo.public_id) {
        await cloudinary.uploader.destroy(user.photo.public_id);
      }

      // Upload new photo
      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(500).json({ message: "Image upload failed." });
      }
      photoUpdate = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    }

    // Update fields only if provided in the request
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (education) updates.education = education;
    if (password) updates.password = await bcrypt.hash(password, 10);
    if (Object.keys(photoUpdate).length > 0) updates.photo = photoUpdate;

    // Prevent duplicate email or phone
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: user._id } }); // Exclude current user
      if (emailExists) return res.status(400).json({ message: "Email already in use." });
    }
    if (phone && phone !== user.phone) {
      const phoneExists = await User.findOne({ phone, _id: { $ne: user._id } }); // Exclude current user
      if (phoneExists) return res.status(400).json({ message: "Phone number already in use." });
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};