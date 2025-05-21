const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseHandler');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return errorResponse(
        res,
        401,
        'Authentication required. Please log in to access this resource.'
      );

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
