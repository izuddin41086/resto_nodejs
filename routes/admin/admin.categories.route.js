const router = require("express").Router();
const categories = require("../../controllers/admin/admin.categories.controller");

router.get("/", categories.index);
router.get("/add", categories.add);
router.get("/showlist", categories.showList);
router.post("/add", categories.add);
router.get("/update/:id", categories.update);
router.post("/update/:id", categories.update);
router.post("/dataTable", categories.data_table);
router.get("/:id", categories.detail);
router.put("/:id", categories.update);
router.delete("/delete/:id", categories.delete);

module.exports = router