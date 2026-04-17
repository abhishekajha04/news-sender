const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/user.controller");

router.post("/preferences", auth, ctrl.updatePreferences);

module.exports = router;