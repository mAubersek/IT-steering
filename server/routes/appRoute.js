const { Signup, Login } = require("../Controllers/authController");
const { addProject, getProjects, deleteProject, updateProject} = require("../controllers/appController");
const { userVerification } = require("../middlewares/authMiddleware");
const { addInitialContent, deleteAll } = require("../Controllers/db");
const router = require("express").Router();


router.post("/register", Signup);
router.post('/login', Login);
router.post('/',userVerification);

router.post("/project", addProject);
router.get("/projects", getProjects);

router.route("/project/:id")
    .delete(deleteProject)
    .put(updateProject);

router.route("/db")
    .post(addInitialContent)
    .delete(deleteAll);

module.exports = router;
