const express = require("express");
const router = express.Router();
const db = require("../db");


// CREATE
router.post("/", async (req, res) => {
  const { name, sku, category, unit, stock } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO products(name, sku, category, unit, stock) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [name, sku, category, unit, stock]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


// READ
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM products");
  res.json(result.rows);
});


// UPDATE
router.put("/:id", async (req, res) => {
  const { name, sku, category, unit, stock } = req.body;

  await db.query(
    "UPDATE products SET name=$1, sku=$2, category=$3, unit=$4, stock=$5 WHERE id=$6",
    [name, sku, category, unit, stock, req.params.id]
  );

  res.json("updated");
});


// DELETE
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM products WHERE id=$1", [
    req.params.id,
  ]);

  res.json("deleted");
});

module.exports = router;