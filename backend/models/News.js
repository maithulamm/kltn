
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            min: 1,
            max: 100,
        },
        type: {
            type: Array,
            default: null,
            min: 1,
            max: 50,
        },
        content: {
            type: String,
            min: 1,
            max: 1000,
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
