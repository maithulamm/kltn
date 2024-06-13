
const mongoose = require("mongoose");

const place2Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 1,
      max: 100,
    },
    type: {
      type: String,
      require: true,
      min: 1,
      max: 50,
    },
    phone: {
      type: String,
      min: 1,
      max: 50,
    },
    address: {
        type: String,
        require: true,
        min: 1,
        max: 200,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place2", place2Schema);
