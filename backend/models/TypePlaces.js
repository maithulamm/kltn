
const mongoose = require("mongoose");

const TypePlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 1,
      max: 100,
    },
    color: {
      type: String,
      require: true,
      min: 1,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TypePlace", TypePlaceSchema);
