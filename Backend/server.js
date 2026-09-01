const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/eventRegistrationDB")
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

// Registration Schema
const registrationSchema = new mongoose.Schema({
    registrationId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    ticketType: {
        type: String,
        required: true
    },

    photo: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Registration = mongoose.model(
    "Registration",
    registrationSchema
);

// Save registration
app.post("/api/register", async (req, res) => {

    try {

        const registration = new Registration(req.body);

        await registration.save();

        res.status(201).json({
            success: true,
            message: "Registration saved successfully",
            registrationId: registration.registrationId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });

    }
});

// Get all registrations
app.get("/api/registrations", async (req, res) => {

    try {

        const registrations = await Registration.find()
            .sort({ createdAt: -1 });

        res.json(registrations);

    } catch (error) {

        res.status(500).json({
            message: "Unable to fetch registrations"
        });

    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});