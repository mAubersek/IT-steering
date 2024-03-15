const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
    },
    description: {
        type: String,
        required: [true, "Project description is required"],
    },
    impact: {
        type: String,
        required: [true, "Project impact is required"],
    },
    status: {
        type: String,
        required: [true, "Project status is required"],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Project", projectSchema, "Projects");

