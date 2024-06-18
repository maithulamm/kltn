const News = require("../models/News");
const bcrypt = require("bcrypt");
const newControllers = {
    // Get all news
    getAllNews: async (req, res) => {
        try {
        const news = await News.find();
        res.status(200).json(news);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    // Delete a news
    deleteNews: async (req, res) => {
        try {
        await News.findByIdAndDelete(req.params.id);
        res.status(200).json("News has been deleted...");
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    // Update a news
    updateNews: async (req, res) => {
        try {
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedNews);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    // Add a news
    addNews: async (req, res) => {
        try {
        const newNews = new News(req.body);
        const savedNews = await newNews.save();
        res.status(200).json(savedNews);
        } catch (err) {
        res.status(500).json(err);
        }
    },
};

module.exports = newControllers;