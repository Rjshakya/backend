import { readAllBlogs, readSingleBlog, readUserBlogs } from "../resolvers/blog/handlBlog.js";
import { readBlogComments } from "./comment/handleComments.js";

export const blogResolvers = {
  Query: {
    readAllBlogs,
    readSingleBlog,
    readBlogComments,
    readUserBlogs
  },
};

