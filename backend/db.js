const sql = require('mssql');
require('dotenv').config();

const config = {
  user: 'sa',
  password: 'Leang123!',
  server: 'localhost',
  database: 'ProductDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

module.exports = { sql, config };
