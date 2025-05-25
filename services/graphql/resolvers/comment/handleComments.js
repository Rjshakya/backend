import Comment from "../../../../models/comments.js"



export const readBlogComments = async (_, { id }) => {

    try {

        const comments = await Comment.find({ ToBlog: id }).populate("byUser")
        if (comments.length < 1) {
            return []
        }

        return comments

    } catch (error) {
        console.log(error)
        throw error
    }

}