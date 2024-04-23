import express from "express"
import { getMyprofile, getAllUsers, login, register, logout } from "../controllers/user.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/all", getAllUsers)

router.post("/register",register)

router.post("/login",login)

router.get("/logout",logout)

router.get("/me",isAuthenticated, getMyprofile)


export default router