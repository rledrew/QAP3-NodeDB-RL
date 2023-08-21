const express = require("express");
const methodOverride = require("method-override");
const apiRoutes = require("./routes/api");
const bakeryMenuDAL = require("./dal/bakery_menu");
const app = express();

// Static files
app.use(express.static("public"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/menu", async (req, res) => {
  const menuItems = await bakeryMenuDAL.getAllMenuItems();
  res.render("menu", { menuItems });
});

app.use("/api", apiRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
