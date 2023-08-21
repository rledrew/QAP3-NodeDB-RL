const express = require("express");
const bakeryMenuDAL = require("../dal/bakery_menu");

const router = express.Router();

// GET all menu items
router.get("/menu", async (req, res) => {
  console.log("get all successful");
  const menuItems = await bakeryMenuDAL.getAllMenuItems();
  res.redirect("/menu");
});

// GET a menu item by ID
router.get("/menu/:id", async (req, res) => {
  console.log("get one successful");
  console.log(req.url);
  const menuItem = await bakeryMenuDAL.getMenuItemById(req.params.id);
  //   res.json(menuItem);
  res.redirect("/menu");
});

// POST a new menu item
router.post("/menu", async (req, res) => {
  console.log("post successful");
  const menuItem = await bakeryMenuDAL.createMenuItem(req.body);
  //   res.json(menuItem);
  res.redirect("/menu");
});

// PUT (update) a menu item by ID
router.put("/menu/:id", async (req, res) => {
  console.log("put successful");
  const menuItem = await bakeryMenuDAL.updateMenuItem(req.params.id, req.body);
  //   res.json(menuItem);
  res.redirect("/menu");
});
// DELETE a menu item by ID
router.get("/delete/:id", async (req, res) => {
  console.log("delete successful");
  await bakeryMenuDAL.deleteMenuItem(req.params.id);
  res.redirect("/menu");
});

module.exports = router;
