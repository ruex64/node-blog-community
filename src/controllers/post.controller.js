import { Post } from "../models/post.model.js";
import ErrorHandler from "../middleware/error.middleware.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";


export const createPost = async(req, res , next) => {

    try {

        const {title, description} = req.body

        if([title, description].some((field) => field?.trim() === "")){
            throw new ErrorHandler("All feilds are required", 400)
        }

        
        const photoLocalPath = req.file?.path
        
        console.log(photoLocalPath)

        if(!photoLocalPath){
            throw new ErrorHandler("Image file is required", 400)
        }

        console.log(photoLocalPath)

        const uploadImage = await uploadOnCloudinary(photoLocalPath)

        console.log(uploadImage)

        const uploaded = await Post.create({
            photoUrl : uploadImage.url,
            title,
            description
        })

        return res.status(201).json({
            success:true,
            message: "Post created successfully",
            uploaded
        })

        
    } catch (error) {
        next(error)
    }

} 

export const getAllPost = async(req, res, next) => {
    try {
        
        const posts = await Post.find({})

        res.status(200).json({
            success: true,
            message: "All post fetched successfully",
            posts
        })


    } catch (error) {
        next(error)
    }
}

export const deletePost = async(req, res, next) => {

    try {

        const {id} = req.params

        const deletedPost = await Post.findByIdAndDelete(id)

        res.status(202).json({
            success: true,
            message: "Post deleted successfully",
            deletePost
        })
        
    } catch (error) {
        next(error)
    }

}