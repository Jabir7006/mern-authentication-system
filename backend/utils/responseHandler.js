export const errorResponse = (
  res,
  statusCode = 404,
  message = 'item not found'
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const successResponse = (
  res,
  statusCode = 200,
  message = '',
  payload = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};
