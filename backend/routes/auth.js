const authControllers = require('../controllers/authControllers');
const middlewareControllers = require('../controllers/middleware');

const router = require('express').Router();

router.post('/register', authControllers.registerUser);

router.post('/login', authControllers.loginUser);

// refresh token
router.post('/refresh', authControllers.requestRefreshToken);

// logout
// router.post('/logout', middlewareControllers.verifyToken, authControllers.logoutUser);

// edit user
router.put('/edit', middlewareControllers.verifyToken, authControllers.editUser);

module.exports = router;