import Blog from "../../models/blogs.js";

const createBlog = async (req, res) => {
  const user = req?.user;
  const { Title, Content } = req?.body;
  const Thumbnail = req.file;

  console.log(Thumbnail , req.file_buffer);
  

  if (!Title || !Content || !user) {
    return res.status(400).json({
      success: false,
      msg: "Bad request",
    });
  }

  const imgPath = Thumbnail?.location


  const blog = await Blog.create({
    Title: Title,
    Content: Content,
    Thumbnail: imgPath,
    createdBy: user.id,
  });

  if (!blog) {
    return res.status(500).json({
      success: false,
      msg: "failed to create Blog",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "blog created successfully",
    data: blog,
  });
};

export const addImgInContent = async(req, res) => {

  const Image = req.file;
  if(!Image){
    return res.status(400).json({
      success:false,
      msg : 'No file found'

    })
  }
  const path = Image?.location

  return res.status(200).json({
    success:true,
    msg:'Image uploaded successfully',
    url : path
  })

}

export default createBlog;
