const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const insuranceController= require('../controllers/insuranceController');
const router = express.Router();

router.get("/insurance/:id", authMiddleware.verifyToken, insuranceController.getInsuranceDetail);
router.put('/insurance/:id/update', authMiddleware.verifyToken, insuranceController.updateInsurance)
module.exports= router;