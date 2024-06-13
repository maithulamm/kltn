const Places = require("../models/Places");

const placeControllers = {
  // Add a place
  addPlace: async (req, res) => {
    try {
        const newPlace = await new Places({
            intro: req.body.intro,
            price: req.body.price,
            type: req.body.type,
            phone: req.body.phone,
            during: req.body.during,
            open: req.body.open,
            close: req.body.close,
            email: req.body.email,
            address: req.body.address,
            info: req.body.info,
            lat: req.body.lat,
            long: req.body.long,
        });

        const place = await newPlace.save();
        res.status(200).json(place);
    } catch {
        res.status(500).json(err);
    }
  },

  // Update a place
  updatePlace: async (req, res) => {
    try {
      const updatedPlace = await Places.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPlace);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get all Places
  getAllPlaces: async (req, res) => {
    try {
      const places = await Places.find();
      res.status(200).json(places);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a place
  deletePlace: async (req, res) => {
    try {
      await Places.findByIdAndDelete(req.params.id);
      res.status(200).json("Place has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = placeControllers;
