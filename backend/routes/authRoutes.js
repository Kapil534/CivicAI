const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const db = require("../database/db");



// ==================== SIGNUP ====================

router.post("/signup", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO Users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [name, email, hashedPassword], function(err) {

            if (err) {

                if (err.message.includes("UNIQUE")) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                return res.status(500).json({
                    message: "Signup failed"
                });
            }

            res.status(201).json({
                message: "User registered successfully",
                userId: this.lastID
            });

        });

    } catch (error) {

        res.status(500).json({
            message: "Something went wrong"
        });

    }

});


// ==================== LOGIN ====================

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = `
        SELECT * FROM Users
        WHERE email = ?
    `;

    db.get(sql, [email], async (err, user) => {

        if (err) {
            return res.status(500).json({
                message: "Login failed"
            });
        }

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return res.status(401).json({
        message: "Invalid email or password"
    });
}


const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

res.json({
    message: "Login successful",
    token: token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
    });

});


router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Protected route accessed successfully",
        user: req.user
    });

});

// ==================== EXPORT ====================

module.exports = router;