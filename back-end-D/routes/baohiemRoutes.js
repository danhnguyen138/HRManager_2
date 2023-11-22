const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const baohiemController= require('../controllers/baohiemController');

const router= express.Router();

router.get('/baohiem/lichsucapnhat/:id', authMiddleware.verifyToken, baohiemController.getLichSuCapNhat)
router.get('/baohiem/nhanvien', authMiddleware.verifyTokenIsAdmin, baohiemController.getNhanVienNotInBaoHiem); // Lay thong tin nhan vien chua tham gia bao hiem
router.post('/baohiem/create', authMiddleware.verifyTokenIsAdmin, baohiemController.createBaoHiem);
router.get('/baohiem', authMiddleware.verifyTokenIsAdmin, baohiemController.getBaoHiem)
router.delete('/baohiem/:id/delete', authMiddleware.verifyTokenIsAdmin, baohiemController.deleteBaoHiem);
router.get('/baohiem/:id', authMiddleware.verifyTokenIsAdmin, baohiemController.getBaoHiemById);
router.put('/baohiem/:id/update', authMiddleware.verifyTokenIsAdmin, baohiemController.updateBaoHiem)
module.exports= router;