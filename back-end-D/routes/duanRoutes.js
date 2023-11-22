const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const duanController= require('../controllers/duanController');
const router = express.Router();

router.get('/api/user/duan/:tenphongban', authMiddleware.verifyToken, duanController.getDanhSachDuAn)
router.get('/api/user/getduan/:idproject', authMiddleware.verifyToken, duanController.getDuAnbyID)
router.put('/api/user/updateproject/:idproject', authMiddleware.verifyToken, duanController.updateDuAnbyID)
router.post('/api/user/addproject/:tenphongban', authMiddleware.verifyToken, duanController.CreateDuAn)

module.exports= router;