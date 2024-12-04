const BookModel = require("../Models/bookModel");
const { sendSuccess, sendError } = require("../utils/responseHandler");

//Create Api
const create = async (req, res) => {
  console.log(req.body);
  try {
    const userData = new BookModel(req.body);

    if (!userData) {
      return sendError(res, "Books data not found", 404);
      // return res.status(404).json({msg: "User data not found"});
    }

    const savedData = await userData.save();
    return sendSuccess(res, "Book Added Successfully", savedData);
    // res.status(200).json({msg: "Book Create Successfully"});
  } catch (error) {
    return sendError(res, error, 500);
    // return res.status(500).json({error: error});
  }
};

// Fetch All data api
const getAll = async (req, res) => {
  try {
    const bookData = await BookModel.find();

    if (!bookData) {
      return sendError(res, "Books data not found", 404);
      // return res.status(404).json({msg: "User data not found"});
    }
    return sendSuccess(res, "Books data fetched Successfully", bookData);
    // res.status(200).json(userData);
  } catch (error) {
    return sendError(res, error, 500);
    // return res.status(500).json({error: error});
  }
};
module.exports = {
  create,
  getAll,
};
