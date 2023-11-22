const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const thietlapController= require('../controllers/thietlapController');
const router = express.Router();

router.get('/thietlap', authMiddleware.verifyTokenIsAdmin, thietlapController.getThietLap);
router.put('/chamcongthietlap/update', authMiddleware.verifyTokenIsAdmin, thietlapController.updateChamCongThietLap)
module.exports= router;