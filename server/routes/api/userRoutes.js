const router = require('express').Router();
const protect = require('../../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUsername,
    updateEmail,
    updatePassword,
} = require('../../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.route('/userName').put(protect, updateUsername);
router.route('/userEmail').put(protect, updateEmail);
router.route('/userPassword').put(protect, updatePassword);

module.exports = router;