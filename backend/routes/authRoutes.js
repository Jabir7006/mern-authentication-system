const express = require('express');
const authRouter = express.Router();
const {
  registerUser,
  verifyEmail,
  resendVerificationCode,
  loginUser,
  logoutUser,
  checkAuth,
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

authRouter.post('/register', registerUser);
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/resend-verification', resendVerificationCode);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/check-auth', authMiddleware, checkAuth);

module.exports = authRouter;
