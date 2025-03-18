import { Router } from "express";
import { addUser } from "../controller/userController.js";

const router = Router();

router.post("/users", addUser);

export { router as userRouter };
