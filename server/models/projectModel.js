const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: [true, "Project title is required"],
    },
    description: {
        type: String,
        required: [true, "Project description is required"],
    },
    projectValue: {
        type: String,
        required: [true, "Project impact is required"],
    },
    status: {
        type: String,
        enum: ['V presoji', 'V izvedbi', 'Na čakanju', 'Zaključeno'],
        default: 'V presoji',
    },
    deadline: {
        type: Date,
        required: [true, "Project deadline is required"],
    }
});

module.exports = mongoose.model("Project", projectSchema, "Projects");

