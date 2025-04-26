import mongoose, { Schema } from "mongoose";

const commentScheme = new Schema({
  ToBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
    index: true,
  },
  byUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  parentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
    default: null,
  },
  childrens: [
    {
      parentID: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
    },
  ],
});

const Comment = mongoose.model("comment", commentScheme);
export default Comment;
