const router = require("express").Router();
const categories = require("../../controllers/admin/admin.categories.controller");
const auth = require("../../middleware/auth");

router.get("/", auth.isLoggedIn, categories.index);
router.get("/add", auth.isLoggedIn, categories.add);
router.get("/showlist", auth.isLoggedIn, categories.showList);
router.post("/add", auth.isLoggedIn, categories.add);
router.get("/update/:id", auth.isLoggedIn, categories.update);
router.post("/update/:id", auth.isLoggedIn, categories.update);
router.post("/dataTable", auth.isLoggedIn, categories.data_table);
router.get("/:id", auth.isLoggedIn, categories.detail);
router.put("/:id", auth.isLoggedIn, categories.update);
router.delete("/delete/:id", auth.isLoggedIn, categories.delete);

module.exports = router