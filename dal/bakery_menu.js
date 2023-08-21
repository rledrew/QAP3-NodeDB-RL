const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "QAP 3",
  password: "1234",
  port: 5432,
});

// GET all menu items
async function getAllMenuItems() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM Bakery_Menu");
    return result.rows;
  } finally {
    client.release();
  }
}

// GET a menu item by ID
async function getMenuItemById(id) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM Bakery_Menu WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// POST a new menu item
async function createMenuItem(menuItem) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO Bakery_Menu (item_name, price) VALUES ($1, $2) RETURNING *",
      [menuItem.item_name, menuItem.price]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// PUT (update) a menu item by ID
async function updateMenuItem(id, menuItem) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE Bakery_Menu SET item_name = $1, price = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [menuItem.item_name, menuItem.price, id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// DELETE a menu item by ID
async function deleteMenuItem(id) {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM Bakery_Menu WHERE id = $1", [id]);
  } finally {
    client.release();
  }
}

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
