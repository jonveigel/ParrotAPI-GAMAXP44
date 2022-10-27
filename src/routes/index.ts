import { Router } from "express";
import admin from "./admin";
import auth from "./auth";
import post from "./post";
import user from "./user";

const routes = Router();

routes.use("/login", auth)
routes.use("/user", user)
routes.use("/post", post)
routes.use("/admin", admin)

export default routes;