const express = require("express");
const router = express.Router();
const taskCtrl = require("../controllers/tasks");

router.get("/", taskCtrl.index);
router.get("/new", taskCtrl.new);
router.post("/", taskCtrl.create);
router.get("/:taskId", taskCtrl.show);
router.delete('/:taskId', taskCtrl.delete);
router.get('/:taskId/edit', taskCtrl.edit);
router.put('/:taskId', taskCtrl.update);

module.exports = router;
