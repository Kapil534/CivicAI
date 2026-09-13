const express = require("express");
const router = express.Router();

const db = require("../database/db");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// Get All Complaints
router.get(
    "/complaints",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        const sql = `
            SELECT *
            FROM Complaints
            ORDER BY created_at DESC
        `;

        db.all(sql, [], (err, rows) => {

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

    }
);

// Get Single Complaint - Admin
router.get(
    "/complaints/:id",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        const complaintId = req.params.id;

        const sql = `
            SELECT *
            FROM Complaints
            WHERE id = ?
        `;

        db.get(sql, [complaintId], (err, row) => {

            if (err) {
                console.error(
                    "Failed to fetch complaint:",
                    err.message
                );

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
    }
);


// Update Complaint Status
router.put(
    "/complaints/:id/status",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        const complaintId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const sql = `
            UPDATE Complaints
            SET status = ?
            WHERE id = ?
        `;

        db.run(
            sql,
            [status, complaintId],
            function (err) {

                if (err) {
                    console.error(
                        "Failed to update complaint status:",
                        err.message
                    );

                    return res.status(500).json({
                        message: "Failed to update complaint status"
                    });
                }

                if (this.changes === 0) {
                    return res.status(404).json({
                        message: "Complaint not found"
                    });
                }

                res.status(200).json({
                    message: "Complaint status updated successfully"
                });

            }
        );

    }
);


// Delete Complaint - Admin
router.delete(
    "/complaints/:id",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        const complaintId = req.params.id;

        const sql = `
            DELETE FROM Complaints
            WHERE id = ?
        `;

        db.run(
            sql,
            [complaintId],
            function (err) {

                if (err) {
                    console.error(
                        "Failed to delete complaint:",
                        err.message
                    );

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

    }
);


module.exports = router;