import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { jwtMiddleware } from "../middleware/JwtMiddleware";

const router = Router();

router.post("/", jwtMiddleware, new PostController().create);
router.get("/", jwtMiddleware, new PostController().listAll);
router.get("/myposts", jwtMiddleware, new PostController().listAllByUserId);

export default router;