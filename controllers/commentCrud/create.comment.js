import Comment from "../../models/comments.js";

export const createComment = async (req, res) => {
  const { userID, blogID, content } = req.body;

  if ((!userID, !blogID, !content)) {
    return res.status(400).json({
      success: false,
      msg: "Bad request",
    });
  }

  console.log(userID, blogID, content);

  try {
    const comment = await Comment.create({
      ToBlog: blogID,
      byUser: userID,
      content: content,
    });

    console.log(comment);

    return res.status(200).json({
      success: true,
      msg: "comment success",
      comment,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      msg: "failed to comment",
    });
  }
};

export const createReply = async (req, res) => {
  const { blogID, userID, parentID, content } = req.body;

  if (!blogID || !userID || !parentID || !content) {
    return res.status(400).json({
      success: false,
      msg: "bad request",
    });
  }

  try {
    const reply = await Comment.create({
      ToBlog: blogID,
      byUser: userID,
      content: content,
      parentID: parentID,
    });
    const parent = await Comment.findByIdAndUpdate(parentID, {
      $push: { childrens: reply.toObject() },
    });

    return res.status(200).json({
      success: true,
      msg: "reply success",
      reply,
      parent,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "failed to reply",
    });
  }
};
