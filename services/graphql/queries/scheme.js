export const queryScheme = `
       
        type Query{
        
        readAllBlogs:[Blog]
        readSingleBlog(id:String!):Blog
        readBlogComments(id:String!):[Comment]
        readUserBlogs(id:String!):[Blog]
        
        }
        

`;
