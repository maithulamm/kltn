const { Double } = require("mongodb");
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
      type: String,
      require: true,
      min: 1,
      max: 50,
    },
    phone: {
      type: String,
      require: true,
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
        max: 100,
    },
    close: {
        type: String,
        require: true,
        min: 1,
        max: 100,
    },
    email: {
        type: String,
        require: true,
        min: 1,
        max: 100,
    },
    address: {
        type: String,
        require: true,
        min: 1,
        max: 100,
    },
    info: {
        type: String,
        require: true,
        min: 1,
        max: 100,
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
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
