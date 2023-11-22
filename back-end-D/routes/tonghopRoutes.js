const express= require('express');

const authMiddleware= require('../middleware/authMiddleware');
const tonghopController= require('../controllers/tonghopController');
const router = express.Router();
router.post('/tonghop', authMiddleware.verifyTokenIsAdmin, tonghopController.postTongHop)
module.exports= router;