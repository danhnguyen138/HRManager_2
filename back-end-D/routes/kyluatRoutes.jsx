const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const kyluatController= require('../controllers/kyluatController');
const router= express.Router();

router.post('/kyluat/create', authMiddleware.verifyTokenIsAdmin, kyluatController.createKyLuat);
router.get('/kyluat', authMiddleware.verifyTokenIsAdmin, kyluatController.getAllKyLuat);
router.get('/kyluat/:id', authMiddleware.verifyTokenIsAdmin, kyluatController.getKyLuatById);
router.delete('/kyluat/:id/delete', authMiddleware.verifyTokenIsAdmin, kyluatController.deleteKyLuat);
router.put('/kyluat/:id/update', authMiddleware.verifyTokenIsAdmin, kyluatController.updateKyLuat);
router.post('/kyluat/:id/send', authMiddleware.verifyTokenIsAdmin, kyluatController.sendKyLuat);
module.exports= router;