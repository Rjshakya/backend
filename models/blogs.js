
import mongoose from "mongoose";

const blogScheme = new mongoose.Schema({

    Title : String ,
    Content : String ,
    Thumbnail : String ,
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
        
    }

} ,{timestamps:true})


const Blog = mongoose.model("Blog" , blogScheme)
export default Blog