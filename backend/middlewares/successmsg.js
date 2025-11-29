// middleware for sending success msg to client

const successResponse = (req, res, next) => {
  res.success = (data = {}, message = "Success", statusCode = 200) => {
    // if (!data) {
    //   data = message
    // }
    res.
      status(statusCode)
      .json({
        success: true,
        message,
        data
      });
  };
  next();
};

module.exports = successResponse;