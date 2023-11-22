const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const thaydoiluongController= require('../controllers/thaydoiluongController');
const router = express.Router();

router.get('/luongcunhanvien/:id', authMiddleware.verifyTokenIsAdmin, thaydoiluongController.getLuongCuById);
router.post('/thaydoiluong/create', authMiddleware.verifyTokenIsAdmin,thaydoiluongController.createThayDoiLuong );
router.get('/thaydoiluong/:id',authMiddleware.verifyTokenIsAdmin, thaydoiluongController.getThayDoiById)
module.exports= router;