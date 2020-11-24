const router = require("express").Router();
const products = require("../../controllers/api/products.controller");

router.post("/", products.create);
router.get("/", products.findAll);
router.get("/published", products.findAllPublished);
router.get("/:id", products.findOne);
router.put("/:id", products.update);
router.delete("/:id", products.delete);
router.delete("/", products.deleteAll);

module.exports = router