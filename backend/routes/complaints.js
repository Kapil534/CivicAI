const express = require("express");
const router = express.Router();

const db = require("../database/db");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Create Complaint
router.post("/", authMiddleware, upload.single("image"), (req, res) => {

    const { title, description, category, location } = req.body;
     const image = req.file ? req.file.filename : null;
    if (!title || !description || !category) {
        return res.status(400).json({
            message: "Title, description and category are required"
        });
    }

    const user_id = req.user.id;

    const sql = `
        INSERT INTO Complaints
        (title, description, category, location, image, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [title, description, category, location || null, image, user_id],
        function (err) {

            if (err) {
                console.error("Complaint creation failed:", err.message);

                return res.status(500).json({
                    message: "Failed to create complaint"
                });
            }

            res.status(201).json({
                message: "Complaint created successfully",
                complaintId: this.lastID
            });
        }
    );
});

// Get all complaints
router.get("/", authMiddleware, (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT *
        FROM Complaints
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.all(sql, [user_id], (err, rows) => {

        if (err) {
            console.error("Failed to fetch complaints:", err.message);

            return res.status(500).json({
                message: "Failed to fetch complaints"
            });
        }

        res.status(200).json({
            complaints: rows
        });
    });
});

// Get single complaint by ID
router.get("/:id", authMiddleware, (req, res) => {

    const complaintId = req.params.id;
    const user_id = req.user.id;

    const sql = `
        SELECT *
        FROM Complaints
        WHERE id = ? AND user_id = ?
    `;

    db.get(sql, [complaintId, user_id], (err, row) => {

        if (err) {
            console.error("Failed to fetch complaint:", err.message);

            return res.status(500).json({
                message: "Failed to fetch complaint"
            });
        }

        if (!row) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            complaint: row
        });
    });
});


// Update Complaint
router.put("/:id", authMiddleware, (req, res) => {

    const complaintId = req.params.id;
    const user_id = req.user.id;

    const { title, description, category, status, location } = req.body;

    const sql = `
        UPDATE Complaints
        SET title = ?,
            description = ?,
            category = ?,
            status = ?,
            location = ?
        WHERE id = ? AND user_id = ?
    `;

    db.run(
        sql,
        [
            title,
            description,
            category,
            status,
            location,
            complaintId,
            user_id
        ],
        function (err) {

            if (err) {
                console.error("Complaint update failed:", err.message);

                return res.status(500).json({
                    message: "Failed to update complaint"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Complaint not found"
                });
            }

            res.status(200).json({
                message: "Complaint updated successfully"
            });
        }
    );
});


// Delete Complaint
router.delete("/:id", authMiddleware, (req, res) => {

    const complaintId = req.params.id;
    const user_id = req.user.id;

    const sql = `
        DELETE FROM Complaints
        WHERE id = ? AND user_id = ?
    `;

    db.run(
        sql,
        [complaintId, user_id],
        function (err) {

            if (err) {
                console.error("Complaint deletion failed:", err.message);

                return res.status(500).json({
                    message: "Failed to delete complaint"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Complaint not found"
                });
            }

            res.status(200).json({
                message: "Complaint deleted successfully"
            });
        }
    );
});

module.exports = router;