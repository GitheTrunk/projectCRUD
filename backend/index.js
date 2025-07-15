const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sql, config } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET all products
app.get('/products', async (req, res) => {
  console.log('GET /products called');
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM PRODUCTS');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM PRODUCTS WHERE PRODUCTID = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE product
app.post('/products', async (req, res) => {
  const { PRODUCTNAME, PRICE, STOCK } = req.body;
  if (!PRODUCTNAME || PRICE <= 0 || STOCK < 0) {
    return res.status(400).json({ error: 'Validation failed' });
  }
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('name', sql.NVarChar, PRODUCTNAME)
      .input('price', sql.Decimal(10, 2), PRICE)
      .input('stock', sql.Int, STOCK)
      .query('INSERT INTO PRODUCTS (PRODUCTNAME, PRICE, STOCK) VALUES (@name, @price, @stock)');
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product
app.put('/products/:id', async (req, res) => {
  const { PRODUCTNAME, PRICE, STOCK } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('name', sql.NVarChar, PRODUCTNAME)
      .input('price', sql.Decimal(10, 2), PRICE)
      .input('stock', sql.Int, STOCK)
      .query('UPDATE PRODUCTS SET PRODUCTNAME = @name, PRICE = @price, STOCK = @stock WHERE PRODUCTID = @id');
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
app.delete('/products/:id', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM PRODUCTS WHERE PRODUCTID = @id');
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
console.log('Database connected:', config.database);
