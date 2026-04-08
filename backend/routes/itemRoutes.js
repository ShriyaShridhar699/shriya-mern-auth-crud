const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");

router.get("/", auth, itemController.getItems);
router.get("/:id", auth, itemController.getItemById);
router.post("/", auth, itemController.createItem);
router.put("/:id", auth, itemController.updateItem);
router.delete("/:id", auth, itemController.deleteItem);
router.get("/stats/all", auth, itemController.getStats);

module.exports = router;