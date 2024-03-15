
const Project = require("../models/projectModel");

const addProject = async (req, res) => {
    const {projectTitle, projectValue, deadline, description} = req.body;
    const newProject = new Project({
        projectTitle,
        description,
        projectValue,
        deadline
    });
    try {
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = addProject