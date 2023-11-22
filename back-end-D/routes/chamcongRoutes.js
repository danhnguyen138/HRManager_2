const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const chamcongController= require('../controllers/chamcongController');

const router= express.Router();

router.get('/chamcong/history', authMiddleware.verifyTokenIsAdmin, chamcongController.getHistory);
router.get('/chamcong/history/:id', authMiddleware.verifyTokenIsAdmin, chamcongController.getHistoryById);
router.post('/chamcong/create',authMiddleware.verifyTokenIsAdmin, chamcongController.createChamCong);
router.put('/chamcong/update', authMiddleware.verifyTokenIsAdmin, chamcongController.updateChamCong);

router.get('/api/user/laydatachamcong/:id', authMiddleware.verifyToken, chamcongController.getHistoryById);
module.exports= router;