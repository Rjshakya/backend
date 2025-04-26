import Comment from "../../models/comments.js";
import { deleteNestedComments } from "../../services/deleteComment.js";

export const deleteBlogComments = async (req, res) => {
  const commentID = req?.query?.commentID;
  const blogID = req?.query?.blogID;
  const authorID = req?.query?.authorID;
  const user = req?.user;

  console.log(user?.id , 'user');
  console.log(authorID , 'author');
  

  if (user?.id !== authorID) {
    return res.status(400).json({
      success: false,
      msg: "you not authorized to delete blog comments",
    });
  }

  try {
    await deleteNestedComments(commentID);

    return res.status(200).json({
      success: true,
      msg: "delete success",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "failed to delete comment",
    });
  }
};

export const deleteMyComment = async (req, res) => {
  const commentID = req?.query;
  const user = req.user;
};
