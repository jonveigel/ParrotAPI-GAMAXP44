import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { JwtMiddleware } from "../middleware/JwtMiddleware";
import { RoleMiddleware } from "../middleware/RoleMiddleware";

const router = Router();

router.post("/login", new AuthController().login);
router.get("/users", [JwtMiddleware, RoleMiddleware("ADMIN")], new UserController().listAll);
router.get("/:iduser", [JwtMiddleware, RoleMiddleware("ADMIN")], new UserController().getOneById);

export default router;
