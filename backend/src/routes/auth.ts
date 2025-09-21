import expresss from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = expresss.Router();

// POST /api/auth/register - Register new user
router.post("/register", registerUser);

// POST /api/auth/login - Login user
router.post("/login", loginUser);

export default router;