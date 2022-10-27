import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { JwtMiddleware } from "../middleware/JwtMiddleware";

const router = Router();

router.post("/", new UserController().create);
router.put("/", JwtMiddleware, new UserController().editUser);

export default router;