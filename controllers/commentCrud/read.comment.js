import mongoose from "mongoose";
import Comment from "../../models/comments.js";

export const readComments = async (req, res) => {
  const blogID = req?.query?.id;

  console.log(blogID);

  if (!blogID) {
    return res.status(400).json({
      success: false,
      msg: "bad request",
    });
  }

  try {
    const comments = await Comment.find({
      ToBlog: new mongoose.Types.ObjectId(blogID),
    })
      .populate("byUser")
      .populate("parentID")
      .populate("childrens")
      .populate("ToBlog")

    return res.status(200).json({
      success: true,
      msg: "get comments",
      comments,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      msg: "failed to get replies",
    });
  }
};
