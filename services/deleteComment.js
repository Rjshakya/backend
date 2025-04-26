import Comment from "../models/comments.js";

export const deleteNestedComments = async (commentID) => {
  try {
    const childComments = await Comment.find({ parentID: commentID });

    if (childComments?.length > 0) {
      for (const comment of childComments) {
        await deleteNestedComments(comment?._id);
      }
    }

    const deleted = await Comment.findByIdAndDelete(commentID)
    return deleted
    console.log(childComments, "my");
  } catch (error) {
    throw error;
  }
};
