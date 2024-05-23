const errorMiddleWare = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";
  const extraMessage = err.extraMessage || "Error from backend";
  const success = err.success || false;
  return res.status(status).json({
    success,
    message,
    extraMessage,
    data: {},
  });
};

export default errorMiddleWare;
