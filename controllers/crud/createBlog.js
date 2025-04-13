import Blog from "../../models/blogs.js";

const createBlog = async (req, res) => {
  const user = req?.user;
  const { Title, Content } = req?.body;
  const Thumbnail = req.file;
 

  console.log(Thumbnail?.filename, user, Title, Content);

  if (!Title || !Content || !user || !Thumbnail?.filename) {
    return res.status(400).json({
      success: false,
      msg: "Bad request",
    });
  }

  const imgPath = `uploads/${Thumbnail?.filename}`;

  // filename: '1744381203668-f3fde379fad1e39fa2b8cda99fa0fc0b.jpg',

  const blog = await Blog.create({
    Title: Title,
    Content: Content,
    Thumbnail: imgPath,
    createdBy: user.id,
  });

  if (!blog) {
    res.status(500).json({
      success: false,
      msg: "failed to create Blog",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "blog created successfully",
    data: blog,
  })
};

export default createBlog;
