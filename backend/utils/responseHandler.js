// utils/responseHandler.js

const sendResponse = (res, statusCode, status, message, data = null) => {
    const response = {
      data,
      statusCode,
      status,
      message,
    };
    return res.status(statusCode).json(response);
  };
  
  module.exports = {
    sendSuccess: (res, message, data = null) =>
      sendResponse(res, 200, "success", message, data),
    sendError: (res, message, statusCode = 500) =>
      sendResponse(res, statusCode, "error", message, null),
  };