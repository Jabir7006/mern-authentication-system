export const errorResponse = (
  res,
  statusCode = 404,
  message = "Item not found",
  errors = null
) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors }),
  };

  return res.status(statusCode).json(response);
};

export const successResponse = (
  res,
  statusCode = 200,
  message = "",
  payload = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};
