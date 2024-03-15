
const Project = require("../models/projectModel");

const addProject = async (req, res) => {
    const {title, description, impact, status} = req.body;
    const newProject = new Project({
        title,
        description,
        impact,
        status
    });
    try {
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = addProject