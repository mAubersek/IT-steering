const projectsData = require("../data/projects.json");
const usersData = require("../data/users.json");
const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const User = mongoose.model("User");
const addInitialContent = async (req, res) => {
    let msg = '';

    for (let project of projectsData) {
       const newProject = new Project(project);
       newProject.projectTitle = project.projectTitle;
       newProject.description = project.description;
       newProject.projectValue = project.projectValue;
       newProject.status = project.status;
       newProject.deadline = project.deadline;
       await newProject.save();
       console.log(`Project ${project.projectTitle} added successfully`);
    }

    for (let user of usersData) {
        const newUser = new User(user);
        newUser.username = user.username;
        newUser.password = user.password;
        await newUser.save();
        console.log(`User ${user.username} added successfully`);
    }

    msg = "Initial projects added successfully";
    res.status(200).json({ message: msg, success: true });
}

const deleteAll = async (req, res) => {
    let msg = "";

    let projects = await Project.find().exec();
    if (projects.length > 0 ) {
        await Project.collection.drop();
        msg = "Projects deleted successfully";

    }

    let users = await User.find().exec();
    if (users.length > 0 ) {
        await User.collection.drop();
        msg = "Users deleted successfully";
    }

    if (msg.length === 0) {
        msg = "Nothing to delete";
    }

    res.status(200).json({ message: msg, success: true });
}

module.exports = {
    addInitialContent,
    deleteAll
}