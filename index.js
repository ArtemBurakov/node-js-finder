const express = require('express');
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'artem',
    password: '0185',
    database: 'finder'
});

app.use(express.json());

app.listen(3001, () => {
    console.log('Your server running on port 3001');
});
