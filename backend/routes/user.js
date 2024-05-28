const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/middleware");
const userControllers = require('../controllers/userControllers');

  const router = require("express").Router();
  //GET ALL USERS
  router.get("/", verifyTokenAndAdmin, userControllers.getAllUsers);
  
  //DELETE USER
  router.delete("/del/:id", verifyTokenAndAdmin, userControllers.deleteUser);

  //UPDATE USER
  router.put("/update/:id", verifyTokenAndAdmin, userControllers.updateUser);

  // ADD USER
  router.post("/add", verifyTokenAndAdmin, userControllers.addUser);
  
  module.exports = router;