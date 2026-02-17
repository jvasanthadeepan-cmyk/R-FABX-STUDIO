const { Pool } = require("pg");
require("dotenv").config({ path: './backend/.env' }); // Try explicit path first
if (!process.env.DB_USER) {
    require("dotenv").config(); // Try default
}

console.log("--- Environment Variables ---");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set (Length: " + process.env.DATABASE_URL.length + ")" : "Not Set");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "***" : "Not Set");
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "***" : "Not Set");
console.log("---------------------------");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "lab_material_db"
});

console.log("Attempting to connect with effective config:");
if (!process.env.DATABASE_URL) {
    console.log(`User: ${process.env.DB_USER || "postgres"}`);
    console.log(`Host: ${process.env.DB_HOST || "localhost"}`);
    console.log(`DB: ${process.env.DB_NAME || "lab_material_db"}`);
} else {
    console.log("Using DATABASE_URL");
}

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("❌ Connection Failed:", err.message);
        if (err.message.includes("password authentication failed")) {
            console.error("💡 Hint: Check your DB_PASSWORD in .env file.");
            console.error("   If you are on Render, ensure the database is attached and environment variables are set.");
        }
        process.exit(1);
    } else {
        console.log("✅ Connection Successful!");
        console.log("Time from DB:", res.rows[0].now);
        process.exit(0);
    }
});
