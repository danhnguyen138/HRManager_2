const express= require('express');

const authMiddleware= require('../middleware/authMiddleware');
const bangcapController= require('../controllers/bangcapController');

const router= express.Router();
router.get('/bangcap/:id', authMiddleware.verifyTokenIsAdmin, bangcapController.getBangCapByIdNhanVien);
router.get('/bangcap/:id/:idBC', authMiddleware.verifyTokenIsAdmin, bangcapController.getBangCapByIdBangCap);
router.post('/bangcap/:id/create', authMiddleware.verifyTokenIsAdmin, bangcapController.createBangCapByIdNhanVien);
router.put('/bangcap/:id/update/:idBC', authMiddleware.verifyTokenIsAdmin, bangcapController.updateBangCapByIdNhanVien);
router.delete('/bangcap/:id/delete/:idBC', authMiddleware.verifyTokenIsAdmin, bangcapController.deleteBangCapByIdNhanVien);
module.exports=router;
