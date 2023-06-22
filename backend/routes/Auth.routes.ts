import { Router } from "express";

import { protect } from "../middlewares/authMiddleware";
import * as authController from "../controllers/AuthController";

const router: Router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", protect, authController.getProfile);
router.put("/forgot-password", protect, authController.forgotPassword);

export default router;
