const express= require('express');

const authMiddleware= require('../middleware/authMiddleware');
const checkinoutController= require('../controllers/checkinoutController');

const router= express.Router();
router.get('/user/chamcong/:id', authMiddleware.verifyToken, checkinoutController.getInOut);

module.exports=router;
