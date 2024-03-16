
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
        res
            .status(200)
            .json({ message: "Project added successfully", success: true, savedProject });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res
            .status(200)
            .json(projects);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json({ message: "Project deleted successfully", success: true });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProject = async (req, res) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, req.body);
        res
            .status(200)
            .json({ message: "Status updated successfully", success: true });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {addProject, getProjects, deleteProject, updateProject}