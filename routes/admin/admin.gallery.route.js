const router = require("express").Router();
const gallery = require("../../controllers/admin/admin.gallery.controller");

router.post("/:id", gallery.create);
router.post("/data/dataTable", gallery.data_table);
router.put("/:id", gallery.update);
router.put("/set_profile/:id", gallery.set_profile);
router.delete("/:id", gallery.delete);

module.exports = router