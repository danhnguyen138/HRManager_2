const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const chucvuController= require('../controllers/chucvuController');
const router= express.Router();

router.get("/chucvu", authMiddleware.verifyToken, chucvuController.getAllChucVu);
router.post("/chucvu/create", authMiddleware.verifyTokenIsAdmin, chucvuController.createChucVu);
router.get("/chucvu/:id", authMiddleware.verifyTokenIsAdmin, chucvuController.getChucVu);
router.delete('/chucvu/:id/delete', authMiddleware.verifyTokenIsAdmin, chucvuController.deleteChucVu);
router.put('/chucvu/:id/update', authMiddleware.verifyTokenIsAdmin, chucvuController.updateChucVu);

router.get('/nhanvienchucvu/:id',authMiddleware.verifyTokenIsAdmin, chucvuController.getNhanVienChucVu);//Lay danh sach chuc vu cua nhan vien
router.put('/nhanvienchucvu/:idNhanVien/:idChucVu/update', authMiddleware.verifyTokenIsAdmin, chucvuController.updateNhanVienChucVu);
module.exports= router;