const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const khenthuongController= require('../controllers/khenthuongController');
const router= express.Router();

router.post('/khenthuongcanhan/create', authMiddleware.verifyTokenIsAdmin, khenthuongController.createKhenThuongCaNhan);
router.post('/khenthuongtapthe/create', authMiddleware.verifyTokenIsAdmin, khenthuongController.createKhenThuongTapThe);
router.get('/khenthuongcanhan', authMiddleware.verifyTokenIsAdmin, khenthuongController.getKhenthuongCanhan);
router.get('/khenthuongtapthe', authMiddleware.verifyTokenIsAdmin, khenthuongController.getKhenthuongTapthe);
router.get('/khenthuongcanhan/:id', authMiddleware.verifyTokenIsAdmin, khenthuongController.getKhenThuongCaNhanById);
router.get('/khenthuongtapthe/:id', authMiddleware.verifyTokenIsAdmin, khenthuongController.getKhenThuongTapTheById);
router.delete('/khenthuongcanhan/:id/delete', authMiddleware.verifyTokenIsAdmin, khenthuongController.deleteKhenThuongCaNhan);
router.delete('/khenthuongtapthe/:id/delete', authMiddleware.verifyTokenIsAdmin, khenthuongController.deleteKhenThuongTapThe);
router.put('/khenthuongcanhan/:id/update', authMiddleware.verifyTokenIsAdmin, khenthuongController.updateKhenThuongCaNhan);
router.put('/khenthuongtapthe/:id/update', authMiddleware.verifyTokenIsAdmin, khenthuongController.updateKhenThuongTapThe);
router.post('/khenthuong/:id/send', authMiddleware.verifyTokenIsAdmin, khenthuongController.sendKhenThuong);
module.exports= router; 