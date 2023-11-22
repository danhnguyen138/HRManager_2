const express= require('express');
const authMiddleware= require('../middleware/authMiddleware.js');
const userController= require('../controllers/userController.js');
const router= express.Router();

router.get('/danhsachnhanvien',authMiddleware.verifyTokenIsAdmin, userController.getAllUser);
router.get('/danhsachnhanvien/:id', authMiddleware.verifyTokenIsAdmin, userController.getUserInformation);
router.get('/danhsachnhanviendaidien', authMiddleware.verifyTokenIsAdmin, userController.getDaiDien)
router.delete('/danhsachnhanvien/:id/delete', authMiddleware.verifyTokenIsAdmin, userController.deleteUser);
router.get('/api/user/nhanvienphongban/:id', authMiddleware.verifyToken, userController.getUserbyIDPhongBan);

module.exports= router;