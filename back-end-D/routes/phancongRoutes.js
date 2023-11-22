const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const phancongController= require('../controllers/phancongController');
const router = express.Router();
router.post('/phancong/create', authMiddleware.verifyTokenIsAdmin, phancongController.CreatePhanCong)
router.get('/phancong/:id/:ngayphancong/:ngaybatdau', authMiddleware.verifyTokenIsAdmin, phancongController.getDanhSachCongViecByIdNhanVien)
router.put('/api/user/updatephancong/:id', authMiddleware.verifyToken, phancongController.updatePhanCong);
router.get('/api/user/getphancongbyidnhanvien/:idnhanvien', authMiddleware.verifyToken, phancongController.getPhanCongcByIdNhanVien)
router.post('/api/user/phancongnhanvien', authMiddleware.verifyToken, (req, res) => {
  phancongController.CreatePhanCong(req, res, req.io);
});
router.delete('/api/user/xoacongviec/:tencongviec/:ngayphancong', authMiddleware.verifyToken, (req, res) => {
  phancongController.deleteCongViecbyName(req, res, req.io);
});
module.exports= router;