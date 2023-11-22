const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const lichsuchucvuController= require('../controllers/lichsuchucvuController');
const router = express.Router();
router.get(`/lichsuchucvu/:id`, authMiddleware.verifyTokenIsAdmin, lichsuchucvuController.getLichSuById);
router.post(`/lichsuchucvu/:id/create`, authMiddleware.verifyTokenIsAdmin, lichsuchucvuController.createLichSuById)
module.exports= router;