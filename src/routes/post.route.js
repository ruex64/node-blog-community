import {Router} from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createPost, deletePost, getAllPost } from "../controllers/post.controller.js";

const router = Router()

router.use(isAuthenticated)


router.route("/upload").post(
    upload.single("image"), createPost
)


router.route("/").get(getAllPost)

router.route("/delete/:id").get(deletePost)

export default router