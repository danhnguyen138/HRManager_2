const express= require('express');

const authMiddleware= require('../middleware/authMiddleware');
const thongbaoController= require('../controllers/thongbaoController');
const router = express.Router();

router.post(`/thongbao/create`, authMiddleware.verifyTokenIsAdmin, thongbaoController.createNotification);
router.get(`/thongbao`, authMiddleware.verifyTokenIsAdmin, thongbaoController.getNotification);
router.delete(`/thongbao/:id/delete`, authMiddleware.verifyTokenIsAdmin, thongbaoController.deleteNotification);
router.get(`/thongbao/:id`, authMiddleware.verifyTokenIsAdmin, thongbaoController.getNotificationById);
router.put(`/thongbao/:id/update`, authMiddleware.verifyTokenIsAdmin, thongbaoController.updateNotification);
router.put(`/thongbao/:id/send`, authMiddleware.verifyTokenIsAdmin, (req, res) => {
    thongbaoController.sendNotification(req, res, req.io);
  });router.get('/api/user/notification/:id',authMiddleware.verifyToken, thongbaoController.getNotificationByIdNhanVien);
router.get('/api/user/notificationunread/:id',authMiddleware.verifyToken, thongbaoController.getNotificationUnReadByIdNhanVien);
router.put('/api/user/updatethongbao/:id/:tieude/:thoigiangui',authMiddleware.verifyToken, thongbaoController.updateNotificationReaded);

module.exports= router;