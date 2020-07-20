class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  if (statusCode === undefined) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "An error occurred trying to process your request",
    });
  } else {
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  }
};

export { ErrorHandler, handleError };
