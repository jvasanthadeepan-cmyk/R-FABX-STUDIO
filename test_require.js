try {
    console.log("Attempting to require ./setup_db...");
    const setupDb = require('./setup_db');
    console.log("Success! setup_db loaded:", typeof setupDb);
} catch (err) {
    console.error("Failed to require ./setup_db:", err);
}
