import Blog from "../../models/blogs.js";

const readAllBlogs = async (req, res) => {
  const user = req?.user;

  if (!user.id) {
    res.status(401).json({
      success: false,
      msg: "user not auhthenticated",
    });
  }

  const findAllBlogs = await Blog.find({}).populate("createdBy");
  if (!findAllBlogs) {
    res.status(400).json({
      success: false,
      msg: "Failed to get Blogs",
      data: {},
    });
  }

  if (findAllBlogs.length < 1) {
    res.status(200).json({
      success: false,
      msg: "No blogs Found",
      data: findAllBlogs,
    });
  }

  return res.status(200).json({
    success: true,
    msg: "All blogs",
    data: findAllBlogs,
  });
};

const readSingleBlog = async (req, res) => {
  const blogID = req?.query?.id;
  console.log(req?.query);

  if (!blogID && blogID?.length < 1) {
    return res.status(401).json({
      success: false,
      msg: "No blogID found",
    });
  }

  const blog = await Blog.findById(blogID).populate("createdBy");

  if (!blog) {
    return res.status(401).json({
      success: false,
      msg: "No blog found",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "your blog",
    data: blog,
  });
};

const getUserBlogs = async (req, res) => {
  const user = req?.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      msg: "no user found ",
    });
  }

  const blogs = await Blog.find({ createdBy: user.id }).populate("createdBy")
  if (!blogs) {
    return res.status(400).json({
      success: true,
      msg: "user has not blogs",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "user blogs",
    data: blogs,
  });
};

export { readAllBlogs, readSingleBlog , getUserBlogs};
