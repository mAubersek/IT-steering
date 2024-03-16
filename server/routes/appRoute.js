const { Signup, Login } = require("../Controllers/authController");
const { addProject, getProjects, deleteProject} = require("../controllers/appController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/register", Signup);
router.post('/login', Login);
router.post('/',userVerification);

router.post("/project", addProject);
router.get("/projects", getProjects);
router.delete("/project/:id", deleteProject);


module.exports = router;
