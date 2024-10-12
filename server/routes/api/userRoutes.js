const router = require('express').Router();
const protect = require('../../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUsername,
    updateEmail
} = require('../../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.route('/userName').put(protect, updateUsername);
router.route('/userEmail').put(protect, updateEmail);

module.exports = router;