const express = require("express");
const router = express.Router();
const taskCtrl = require("../controllers/tasks");
const authController = require("../controllers/auth.js");
const isSignedIn = require("../middleware/is-signed-in.js");

router.get("/", taskCtrl.index);
router.get("/new", taskCtrl.new);
router.post("/", taskCtrl.create);
router.get("/:taskId", taskCtrl.show);
router.delete('/:taskId', taskCtrl.delete);
router.get('/:taskId/edit', taskCtrl.edit);
router.put('/:taskId', taskCtrl.update);
router.get('/reset', isSignedIn, authController.showPwReset);
router.post('/reset', isSignedIn, authController.resetPw)

module.exports = router;
