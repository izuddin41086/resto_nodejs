const router = require("express").Router();
const gallery = require("../../controllers/api/gallery.controller");

router.post("/", gallery.create);
router.get("/", gallery.findAll);
router.get("/published", gallery.findAllPublished);
router.get("/:id", gallery.findOne);
router.put("/:id", gallery.update);
router.delete("/:id", gallery.delete);
router.delete("/", gallery.deleteAll);

module.exports = router