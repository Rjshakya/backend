import Blog from "../../models/blogs.js";
import s3BucketInstance from "../../services/aws.s3.js";
import { JSDOM } from "jsdom"

const handleDeleteBlog = async (req, res) => {
  const id = req?.query.id;


  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "no blogid found",
    });
  }

 

  try {
    const blog = await Blog?.findById(id)
    const key = blog?.Thumbnail.split(".com/")[1];

    // delete content - images
    const content = blog?.Content;
    const doc = new JSDOM(content)
    const images = doc?.window?.document.querySelectorAll("img")
    // const images = doc?.querySelectorAll("img")



    if (images?.length > 0) {
      await handleDeleteAllImg(images)
    }


    // delete thumbnail from storage and blog from db
    await s3BucketInstance.deleteFile(key);
    const deleteBlog = await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      msg: "Blog deleted successfully",
      deleteBlog,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      msg: "failed to deleted blog",
    });
  }
};

export const handleContentImgsDelete = async (req, res) => {
  const { imgs } = req?.body;

  if (!imgs) {
    return res.status(400).json({
      success: false,
      msg: "Bad request",
    });
  }

  try {
    const response = await s3BucketInstance.deleteMultipleFile(imgs);
    return res.status(200).json({
      success: true,
      msg: "Deleted success fully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

export default handleDeleteBlog;


const handleDeleteAllImg = async (images) => {

  const imagesArr = Array.from(images).map((img) => {
    let key = img?.src.split(".com/")[1];
    return {
      Key: key,
    };
  });

  try {
    await s3BucketInstance.deleteMultipleFile(imagesArr);
  } catch (error) {
    throw error;
  }
};
