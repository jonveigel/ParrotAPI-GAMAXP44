import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/", new AuthController().login);

export default router;