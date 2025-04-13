import Blog from "../../models/blogs.js";

const handleDeleteBlog = async (req, res) => {
  const id = req?.query.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "no blogid found",
    });
  }

  const deleteBlog = await Blog.findByIdAndDelete(id);

  console.log(deleteBlog);

  if (!deleteBlog) {
    return res.status(400).json({
      success: false,
      msg: "failed to deleted blog",
    });
  }

  return res
    .status(200)
    .json({
      success: true,
      msg: "Blog deleted successfully",
      deleteBlog,
    })
   
};

export default handleDeleteBlog;
