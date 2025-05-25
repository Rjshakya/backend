import createBlog, { addImgInContent } from "../controllers/crud/createBlog.js";
import { checkUserAuthenticated } from "../middlewares/authMiddleware.js";
import express from "express";
import multer from "multer";
import {
  getUserBlogs,
  readAllBlogs,
  readSingleBlog,
} from "../controllers/crud/readBlog.js";
import {
  handleUpdateBlog,
  handleUpdateBlogThumbnail,
} from "../controllers/crud/updateBlog.js";
import handleDeleteBlog, {
  handleContentImgsDelete,
} from "../controllers/crud/deleteBlog.js";
import s3BucketInstance from "../services/aws.s3.js";
import multerS3 from "multer-s3";
import { readComments } from "../controllers/commentCrud/read.comment.js";
import {
  createComment,
  createReply,
} from "../controllers/commentCrud/create.comment.js";
import {
  deleteBlogComments,
  deleteMyComment,
} from "../controllers/commentCrud/delete.comment.js";

// multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve("./public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

const upload = multer({
  storage: multerS3({
    s3: s3BucketInstance.s3,
    bucket: "mythinkappbucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const path = `thumbnails/${Date.now().toString()}`;
      cb(null, path);
    },
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    acl: "public-read",
  }),
});

const contentImgUpload = multer({
  storage: multerS3({
    s3: s3BucketInstance.s3,
    bucket: "mythinkappbucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const path = `ImagesInBlogContent/${Date.now().toString()}`;
      cb(null, path);
    },
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    acl: "public-read",
  }),
});

const crudrouter = express.Router();

// post
crudrouter.post(
  "/create",
  checkUserAuthenticated,
  upload.single("Thumbnail"),
  createBlog
);

crudrouter.post(
  "/add/imageInContent",
  checkUserAuthenticated,
  contentImgUpload.single("Image"),
  addImgInContent
);

// comments
crudrouter.post("/create/comment", checkUserAuthenticated, createComment);
crudrouter.post("/create/comment/reply", checkUserAuthenticated, createReply);

// get
crudrouter.get("/blogs", readAllBlogs);
crudrouter.get("/blog", readSingleBlog);
crudrouter.get("/user/blogs", checkUserAuthenticated, getUserBlogs);

// comments
crudrouter.get("/comments", readComments);

// put
crudrouter.put(
  "/user/blog/update",

  checkUserAuthenticated,
  handleUpdateBlog
);

// patch
crudrouter.patch(
  "/user/blog/update/Thumbnail",
  upload.single("Thumbnail"),
  checkUserAuthenticated,
  handleUpdateBlogThumbnail
)

crudrouter.patch(
  "/patch/delete/imageInContent",
  checkUserAuthenticated,
  handleContentImgsDelete
);

// delete
crudrouter.delete("/blog/delete", checkUserAuthenticated, handleDeleteBlog);
crudrouter.delete(
  "/delete/blog/comments",
  checkUserAuthenticated,
  deleteBlogComments
);
crudrouter.delete(
  "/delete/mycomment/blog",
  checkUserAuthenticated,
  deleteMyComment
);



export { crudrouter, upload };
