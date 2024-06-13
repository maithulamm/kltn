const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
  } = require("../controllers/middleware");
const place2Controllers = require('../controllers/place2Controllers')

const router = require("express").Router();

router.post("/add", verifyTokenAndAdmin, place2Controllers.addPlace2);

router.get("/", place2Controllers.getAllPlaces2);

router.delete("/del/:id", verifyTokenAndAdmin, place2Controllers.deletePlace2);

router.put("/update/:id", verifyTokenAndAdmin, place2Controllers.updatePlace2);

module.exports = router;