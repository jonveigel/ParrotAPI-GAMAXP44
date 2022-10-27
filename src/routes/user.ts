import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { jwtMiddleware } from "../middleware/JwtMiddleware";

const router = Router();

router.post("/", new UserController().create);
router.put("/", jwtMiddleware, new UserController().editUser);

export default router;