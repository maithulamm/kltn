const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/middleware");
const typePlaceControllers = require('../controllers/typePlaceControllers');

const router = require('express').Router();

router.post('/add', verifyTokenAndAdmin, typePlaceControllers.addTypePlace);

router.put('/update/:id', verifyTokenAndAdmin, typePlaceControllers.updateTypePlace);

router.get('/', typePlaceControllers.getAllTypePlaces);

router.delete('/del/:id', verifyTokenAndAdmin, typePlaceControllers.deleteTypePlace);

module.exports = router;