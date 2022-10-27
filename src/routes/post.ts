import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { JwtMiddleware } from "../middleware/JwtMiddleware";

const router = Router();

router.post("/", JwtMiddleware, new PostController().create);
router.get("/", JwtMiddleware, new PostController().listAll);
router.get("/myposts", JwtMiddleware, new PostController().listAllByUserId);

export default router;