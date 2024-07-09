const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            min: 1,
            max: 100,
        },
        title: {
            type: String,
            require: true,
            min: 1,
            max: 100,
        },
        report: {
            type: String,
            require: true,
            min: 1,
            max: 1000,
        },
        answer: {
            type: String,
            min: 1,
            max: 1000,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);