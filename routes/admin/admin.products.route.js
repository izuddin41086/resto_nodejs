const router = require("express").Router();
const products = require("../../controllers/admin/admin.products.controller");
const auth = require("../../middleware/auth");

router.get("/", auth.isLoggedIn, products.index);
router.get("/add", auth.isLoggedIn, products.add);
router.post("/add", auth.isLoggedIn, products.add);
router.get("/update/:id", auth.isLoggedIn, products.update);
router.post("/update/:id", auth.isLoggedIn, products.update);
router.post("/dataTable", auth.isLoggedIn, products.data_table);
router.get("/:id", auth.isLoggedIn, products.detail);
router.put("/:id", auth.isLoggedIn, products.update);
router.delete("/delete/:id", auth.isLoggedIn, products.delete);

module.exports = router