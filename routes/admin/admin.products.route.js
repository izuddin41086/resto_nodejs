const router = require("express").Router();
const products = require("../../controllers/admin/admin.products.controller");

router.get("/", products.index);
router.get("/add", products.add);
router.post("/add", products.add);
router.get("/update/:id", products.update);
router.post("/update/:id", products.update);
router.post("/dataTable", products.data_table);
router.get("/:id", products.detail);
router.put("/:id", products.update);
router.delete("/delete/:id", products.delete);

module.exports = router