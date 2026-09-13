const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/civicai.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("SQLite Database Connected");
    }
});


// =========================
// Users Table
// =========================

db.run(`
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )
`, (err) => {

    if (err) {
        console.error("Users table creation failed:", err.message);
    } else {
        console.log("Users table created successfully");
    }

});


// =========================
// Add Role Column if Missing
// =========================

db.all(`PRAGMA table_info(Users)`, (err, columns) => {

    if (err) {
        console.error("Failed to check Users table:", err.message);
        return;
    }

    const roleExists = columns.some(column => column.name === "role");

    if (!roleExists) {

        db.run(`
            ALTER TABLE Users
            ADD COLUMN role TEXT DEFAULT 'user'
        `, (err) => {

            if (err) {
                console.error("Role column creation failed:", err.message);
            } else {
                console.log("Role column added successfully");
            }

        });

    } else {

        console.log("Role column already exists");

    }

});


// =========================
// Complaints Table
// =========================

db.run(`
    CREATE TABLE IF NOT EXISTS Complaints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT DEFAULT 'Pending',
        image TEXT,
        location TEXT,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    )
`, (err) => {

    if (err) {
        console.error("Complaints table creation failed:", err.message);
    } else {
        console.log("Complaints table created successfully");
    }

});


module.exports = db;