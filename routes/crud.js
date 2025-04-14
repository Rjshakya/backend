import createBlog from "../controllers/crud/createBlog.js";
import { checkUserAuthenticated } from "../middlewares/authMiddleware.js";
import express from "express";
import multer from "multer";
import path from "path";
import {
  getUserBlogs,
  readAllBlogs,
  readSingleBlog,
} from "../controllers/crud/readBlog.js";
import {
  handleUpdateBlog,
  handleUpdateBlogThumbnail,
} from "../controllers/crud/updateBlog.js";
import handleDeleteBlog from "../controllers/crud/deleteBlog.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const crudrouter = express.Router();

crudrouter.post(
  "/create",
  checkUserAuthenticated,
  upload.single("Thumbnail"),
  createBlog
);

crudrouter.get("/blogs", readAllBlogs);
crudrouter.get("/blog", checkUserAuthenticated, readSingleBlog);
crudrouter.get("/user/blogs", checkUserAuthenticated, getUserBlogs);

crudrouter.put(
  "/user/blog/update",

  checkUserAuthenticated,
  handleUpdateBlog
);

crudrouter.patch(
  "/user/blog/update/Thumbnail",
  upload.single("Thumbnail"),
  checkUserAuthenticated,
  handleUpdateBlogThumbnail
);

crudrouter.delete("/blog/delete", checkUserAuthenticated, handleDeleteBlog);

export { crudrouter , upload };
