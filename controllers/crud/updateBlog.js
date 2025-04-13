import Blog from "../../models/blogs.js";

const handleUpdateBlog = async (req, res) => {
  const { id, Title, Content } = req?.body;

  if (!id || !Title || !Content) {
    return res.status(401).json({
      success: false,
      msg: "No data found to update",
    });
  }

  console.log(req?.body);

  const blog = await Blog.findByIdAndUpdate(id, {
    Title: Title,
    Content: Content,
  });

  if (!blog) {
    return res.status(500).json({
      success: false,
      msg: "There is no blog with that id",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "blog updated successfully",
    blog,
  })
};

const handleUpdateBlogThumbnail = async (req, res) => {
  const Thumbnail = req?.file;
  const { id } = req?.body;


  if (!Thumbnail) {
    return res.status(401).json({
      success: false,
      msg: "No data found to update",
    });
  }

  console.log(Thumbnail);

  const imgUrl = `uploads/${Thumbnail?.filename}`;

  const blog = await Blog.findByIdAndUpdate(id, {
    Thumbnail: imgUrl,
  });

  if (!blog) {
    return res.status(500).json({
      success: false,
      msg: "There is no blog with that id",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "blog thumbnail updated successfully",
    blog,
  })
};

export { handleUpdateBlog, handleUpdateBlogThumbnail };
