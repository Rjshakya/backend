import Blog from "../../models/blogs.js";
import s3BucketInstance from "../../services/aws.s3.js";

const handleDeleteBlog = async (req, res) => {
  const id = req?.query.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "no blogid found",
    });
  }

  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    const key = deleteBlog.Thumbnail.split(".com/")[1];
    await s3BucketInstance.deleteFile(key);
    return res.status(200).json({
      success: true,
      msg: "Blog deleted successfully",
      deleteBlog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "failed to deleted blog",
    });
  }
};

export default handleDeleteBlog;
