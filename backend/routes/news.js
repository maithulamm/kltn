const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
  } = require("../controllers/middleware");

const newsControllers = require('../controllers/newControllers')

const router = require("express").Router();

router.post("/add", verifyTokenAndAdmin, newsControllers.addNews);

router.get("/", newsControllers.getAllNews);

router.delete("/del/:id", verifyTokenAndAdmin, newsControllers.deleteNews);

router.put("/update/:id", verifyTokenAndAdmin, newsControllers.updateNews);

module.exports = router;