const BookModel = require("../Models/bookModel");
const { sendSuccess, sendError } = require("../utils/responseHandler");

//Create Api
const create = async (req, res) => {
  try {
    const userData = new BookModel(req.body);

    if (!userData) {
      return sendError(res, "Books data not found", 404);
  
    }

    const savedData = await userData.save();
    return sendSuccess(res, "Book Added Successfully", savedData);

  } catch (error) {
    return sendError(res, error, 500);
  }
};

// Fetch All data api
const getAll = async (req, res) => {
  try {
    const bookData = await BookModel.find();

    if (!bookData) {
      return sendError(res, "Books data not found", 404);
    }
    return sendSuccess(res, "Books data fetched Successfully", bookData);
  } catch (error) {
    return sendError(res, error, 500);
  }
};
module.exports = {
  create,
  getAll,
};
