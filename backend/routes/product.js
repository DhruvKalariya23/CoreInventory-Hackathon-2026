const express = require("express");
const router = express.Router();
const pool = require("../db");


// get
router.get("/", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM products"
  );

  res.json(result.rows);
});


// add
router.post("/", async (req, res) => {

  const { name, sku, category, unit, stock } = req.body;

  const result = await pool.query(
    "INSERT INTO products(name,sku,category,unit,stock) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [name, sku, category, unit, stock]
  );

  res.json(result.rows[0]);
});


// delete
router.delete("/:id", async (req, res) => {

  await pool.query(
    "DELETE FROM products WHERE id=$1",
    [req.params.id]
  );

  res.json("deleted");
});

module.exports = router;