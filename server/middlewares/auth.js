const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/Usermodel");

// Authentication middleware
exports.auth = async (req, res, next) => {
    try {
        // Extract token from multiple sources
        console.log("BEFORE TOKEN");
        
        const token  = req.header("Authorization")?.replace("Bearer ", "") 
                         || req.body.token
                         || req.cookies?.token

                         console.log("AFTER TOKEN");
                         
                      

        console.log("Token received:", token ? "Token present" : "No token");

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing"
            });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully:", decoded.id);
        } catch (error) {
            console.error("Token verification error:", error.message);
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        // Verify user exists in database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("User authenticated:", user.email);

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        console.error("Authentication middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication"
        });
    }
};

// Student authorization
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        });
    }
};

// Instructor authorization
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructors only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        });
    }
};

// Admin authorization
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admins only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        });
    }
};