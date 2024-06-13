const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
  } = require("../controllers/middleware");
const placeControllers = require('../controllers/placeControllers')

const router = require("express").Router();

router.post("/add", verifyTokenAndAdmin, placeControllers.addPlace);

router.get("/", placeControllers.getAllPlaces);

router.delete("/del/:id", verifyTokenAndAdmin, placeControllers.deletePlace);

router.put("/update/:id", verifyTokenAndAdmin, placeControllers.updatePlace);

module.exports = router;