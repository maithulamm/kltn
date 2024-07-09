const feedbackControllers = require("../controllers/feedbackControllers");

const router = require("express").Router();

router.post("/add", feedbackControllers.addFeedback);

router.put("/update/:id", feedbackControllers.updateFeedback);

router.get("/all", feedbackControllers.getAllFeedbacks);

router.delete("/delete/:id", feedbackControllers.deleteFeedback);

module.exports = router;