
export const commentSchema = `

    type Comment{
      
    _id:ID!
    ToBlog:Blog
    byUser:User
    content:String!
    parentID:Comment


    }

`