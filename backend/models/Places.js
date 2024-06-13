
const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    intro: {
      type: String,
      require: true,
      min: 1,
      max: 100,
    },
    price: {
      type: String,
      require: true,
      min: 1,
      max: 50,
    },
    type: {
      type: Array,
      default: [],
      min: 1,
      max: 50,
    },
    phone: {
      type: String,
      min: 1,
      max: 50,
    },
    during: {
      type: String,
      require: true,
      min: 1,
      max: 100,
    },
    open: {
        type: String,
        min: 1,
        max: 50,
    },
    close: {
        type: String,
        require: true,
        min: 1,
        max: 50,
    },
    email: {
        type: String,
        min: 1,
        max: 100,
    },
    address: {
        type: String,
        require: true,
        min: 1,
        max: 200,
    },
    info: {
        type: String,
        require: true,
        min: 1,
        max: 1000,
    },
    lat: {
        type: String,
        require: true,
        min: 1,
        max: 50,
    },
    long: {
        type: String,
        require: true,
        min: 1,
        max: 50,
    },
    imgURL: {
        type: String,
        default: "", 
        min: 1,
        max: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
