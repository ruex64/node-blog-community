import express from "express";
import userRouter from "./routes/user.route.js"
import userPost from "./routes/post.route.js"
import  { config }  from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middleware/error.middleware.js";
import cors from "cors"

const app = express();

config({
    path: "../.env"
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/post", userPost)


app.use(errorMiddleWare)



export default app
