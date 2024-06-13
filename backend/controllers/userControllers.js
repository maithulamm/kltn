const Users = require("../models/User");
const bcrypt = require("bcrypt");
const userControllers = {
  // Get all users
  getAllUsers: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const users = await Users.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  },
  // Delete a user
  deleteUser: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    if (req.user.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await Users.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  },

  // Add a user
  addUser: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const salt = await bcrypt.genSalt(10);
        const newUser = new Users({
          username: req.body.username,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, salt),
          isAdmin: req.body.isAdmin,
          fullName: req.body.fullName,
          avt: req.body.avt,
          birthday: req.body.birthday,
          gender: req.body.gender,
          phone: req.body.phone,
          prefer: req.body.prefer,
        });
        await newUser.save();
        res.status(200).json("User has been added...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to add a user!");
    }
  },
};

module.exports = userControllers;
