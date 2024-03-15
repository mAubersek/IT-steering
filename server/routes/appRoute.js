const { Signup, Login } = require("../Controllers/authController");
const { userVerification } = require("../middlewares/authMiddleware");
const addProject = require("../controllers/appController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',userVerification);

router.post("/project", addProject);


module.exports = router;
