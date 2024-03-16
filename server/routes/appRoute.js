const { Signup, Login } = require("../Controllers/authController");
const { addProject, getProjects, deleteProject, updateProject} = require("../controllers/appController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/register", Signup);
router.post('/login', Login);
router.post('/',userVerification);

router.post("/project", addProject);
router.get("/projects", getProjects);
router.delete("/project/:id", deleteProject);
router.put("/project/:id", updateProject);


module.exports = router;
