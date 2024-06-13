const TypePlace = require('../models/TypePlaces');


const typePlaceControllers = {
    // Add a type place
    addTypePlace: async (req, res) => {
        try {
            const newTypePlace = await new TypePlace({
                name: req.body.name,
                color: req.body.color,
            });

            const typePlace = await newTypePlace.save();
            res.status(200).json(typePlace);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a type place
    updateTypePlace: async (req, res) => {
        try {
            const updatedTypePlace = await TypePlace.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedTypePlace);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get all TypePlaces
    getAllTypePlaces: async (req, res) => {
        try {
            const typePlaces = await TypePlace.find();
            res.status(200).json(typePlaces);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a type place
    deleteTypePlace: async (req, res) => {
        try {
            await TypePlace.findByIdAndDelete(req.params.id);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = typePlaceControllers;