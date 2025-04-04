const express = require("express");
const router = express.Router();
const {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
} = require("../controllers/listController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.post("/", createList);
router.get("/", getLists);
router.get("/:id", getListById);
router.patch("/:id", updateList);
router.delete("/:id", deleteList);

module.exports = router;
