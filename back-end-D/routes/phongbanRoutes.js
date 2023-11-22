const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const phongbanController= require('../controllers/phongbanController');
const router = express.Router();

router.get("/phongban",authMiddleware.verifyToken, phongbanController.getAll);
router.post('/phongban/create', authMiddleware.verifyTokenIsAdmin, phongbanController.createPhongBan);
router.get("/phongban/:id", authMiddleware.verifyToken, phongbanController.getPhongBanDetail);
router.put("/phongban/:MaPB/update", authMiddleware.verifyTokenIsAdmin, phongbanController.updatePhongBan);
router.delete('/phongban/:id/delete', authMiddleware.verifyTokenIsAdmin, phongbanController.deletePhongBan);
module.exports= router;