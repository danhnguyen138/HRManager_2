const express= require('express');
const authController= require('../controllers/authController.js');
const router= express.Router();

router.post("/login", authController.login); //localhost:9000/api/login
router.post('/password', authController.password);
module.exports= router;