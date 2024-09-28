const router = require('express').Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
} = require('../../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);

module.exports = router;