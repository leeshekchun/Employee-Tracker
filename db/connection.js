const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: '1996111Nov',
    database: 'library'
  },
    console.log('Connected to the library database!')
  );

module.exports = db;