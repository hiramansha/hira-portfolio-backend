const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hira Mansha Portfolio Backend is running!"
    });
});

// Contact form route
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });
    }

    const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toISOString()
    };

    // Read existing messages
    fs.readFile("messages.json", "utf8", (err, data) => {
        let messages = [];

        if (!err && data) {
            try {
                messages = JSON.parse(data);
            } catch (error) {
                messages = [];
            }
        }

        // Add new message
        messages.push(newMessage);

        // Save messages
        fs.writeFile(
            "messages.json",
            JSON.stringify(messages, null, 2),
            (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({
                        success: false,
                        message: "Unable to save your message."
                    });
                }

                res.json({
                    success: true,
                    message: "Your message has been received successfully!"
                });
            }
        );
    });
});

// Get all contact messages
app.get("/api/messages", (req, res) => {
    fs.readFile("messages.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to read messages."
            });
        }

        res.json(JSON.parse(data));
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
