const Places2 = require("../models/Places2");

const place2Controllers = {
  // Add a place2
  addPlace2: async (req, res) => {
    try {
        const newPlace2 = await new Places2({
            name: req.body.name,
            type: req.body.type,
            phone: req.body.phone,
            address: req.body.address,
            lat: req.body.lat,
            long: req.body.long,
        });

        const place2 = await newPlace2.save();
        res.status(200).json(place2);
    } catch {
        res.status(500).json(err);
    }
  },

  // Update a place2
  updatePlace2: async (req, res) => {
    try {
      const updatedPlace2 = await Places2.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPlace2);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get all Places2
  getAllPlaces2: async (req, res) => {
    try {
      const places2 = await Places2.find();
      res.status(200).json(places2);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a place2
  deletePlace2: async (req, res) => {
    try {
      await Places2.findByIdAndDelete(req.params.id);
      res.status(200).json("Place2 has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = place2Controllers;
