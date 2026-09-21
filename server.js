const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Hira Mansha Portfolio Backend is running!"
    });
});

// Contact form route
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });
    }

    console.log("New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.json({
        success: true,
        message: "Your message has been received successfully!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
