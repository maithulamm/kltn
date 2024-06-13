const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      default: "",
      max: 50,
    },
    avt: {
      type: String,
      default: "3",
    },
    birthday: {
      type: Date,
      default: '',
    },
    gender: {
      type: String,
      default: "Nam",
    },
    phone: {
      type: String,
      default: "",
    },
    prefer: {
      type: Array,
      default: null,
      min: 1,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
