
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/admin/login', authController.loginAdmin);



module.exports = router;
