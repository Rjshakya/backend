import Blog from "../../../../models/blogs.js";

export const readAllBlogs = async () => {
  try {
    const blogs = await Blog.find({})
      .populate("createdBy")
      .sort({ createdAt: -1 });
    if (!blogs) {
      return [];
    }

    return blogs;
  } catch (error) {
    throw error;
  }
};

export const readSingleBlog = async (_, { id }) => {
  try {
    const blog = await Blog.findById(id).populate("createdBy");
    if (!blog) {
      return {
        msg: "No blog found",
      };
    }

    return blog;
  } catch (error) {
    throw error;
  }
};

export const readUserBlogs = async (_, { id }) => {
  try {
    const userBlog = await Blog.find({ createdBy: id })
      .populate("createdBy")
      .sort({ createdAt: -1 });

    if (userBlog.length < 1) {
      return [];
    }

    return userBlog;
  } catch (error) {
    throw error;
  }
};
