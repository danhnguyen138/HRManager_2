const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const bangluongController= require('../controllers/bangluongController');

const router= express.Router();

router.get(`/bangluong`, authMiddleware.verifyToken, bangluongController.getBangLuong);
router.get(`/bangluongnhanvien/:idNhanVien`, authMiddleware.verifyToken, bangluongController.getBangLuongNhanVien);
router.post(`/bangluong/create`, authMiddleware.verifyTokenIsAdmin, bangluongController.createBangLuong);
router.get(`/bangluong/:id`, authMiddleware.verifyToken, bangluongController.getBangLuongById);
router.delete(`/bangluong/:id/delete`, authMiddleware.verifyTokenIsAdmin, bangluongController.deleteBangLuong);
router.get(`/thongsobangluong`, authMiddleware.verifyTokenIsAdmin, bangluongController.getThongSo);
router.put(`/thongsobangluong`, authMiddleware.verifyTokenIsAdmin, bangluongController.updateThongSo);
module.exports= router;