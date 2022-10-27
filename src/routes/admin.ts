import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { jwtMiddleware } from "../middleware/JwtMiddleware";
import { roleMiddleware } from "../middleware/RoleMiddleware";

const router = Router();

router.post("/login", new AuthController().login);
router.get("/users", [jwtMiddleware, roleMiddleware("ADMIN")], new UserController().listAll);
router.get("/:iduser", [jwtMiddleware, roleMiddleware("ADMIN")], new UserController().getOneById);

export default router;
