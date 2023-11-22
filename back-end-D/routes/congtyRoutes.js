const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const congtyController= require('../controllers/congtyController');
const router= express.Router();

router.get('/congty', authMiddleware.verifyToken, congtyController.getCongty);
router.put('/congty/update', authMiddleware.verifyTokenIsAdmin, congtyController.updateCongty);
router.get('/luongtoithieusudung', authMiddleware.verifyTokenIsAdmin, congtyController.getLuongToiThieuSuDung);
router.get('/luongtoithieu', authMiddleware.verifyTokenIsAdmin, congtyController.getDanhSachLuongToiThieu);
router.get('/luongtoithieu/:id', authMiddleware.verifyTokenIsAdmin, congtyController.getDanhSachById)
router.delete('/luongtoithieu/:id/delete', authMiddleware.verifyTokenIsAdmin, congtyController.deleteLuongToiThieu)
router.get('/luongtoithieuvung', authMiddleware.verifyTokenIsAdmin, congtyController.getLuongToiThieuVung);
router.post('/ngachluong/create', authMiddleware.verifyTokenIsAdmin, congtyController.createNgachLuong);
router.get('/ngachluong', authMiddleware.verifyTokenIsAdmin, congtyController.getNgachLuong)
router.delete('/ngachluong/:id/delete', authMiddleware.verifyTokenIsAdmin, congtyController.deleteNgachLuong);
router.put('/ngachluong/:id/update', authMiddleware.verifyTokenIsAdmin, congtyController.updateNgachLuong)
router.get('/bacluong/:id', authMiddleware.verifyTokenIsAdmin, congtyController.getBacLuongById);
router.post('/bacluong/create', authMiddleware.verifyTokenIsAdmin, congtyController.createBacLuong);
module.exports= router;