const Feedback = require("../models/Feedback");

const feedbackControllers = {
    // Add a feedback
    addFeedback: async (req, res) => {
        try {
            const newFeedback = await new Feedback({
                name: req.body.name,
                title: req.body.title,
                report: req.body.report,
                answer: req.body.answer,
            });

            const feedback = await newFeedback.save();
            res.status(200).json(feedback);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a feedback
    updateFeedback: async (req, res) => {
        try {
            const updatedFeedback = await Feedback.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedFeedback);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get all Feedbacks
    getAllFeedbacks: async (req, res) => {
        try {
            const feedbacks = await Feedback.find();
            res.status(200).json(feedbacks);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a feedback
    deleteFeedback: async (req, res) => {
        try {
            await Feedback.findByIdAndDelete(req.params.id);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = feedbackControllers;