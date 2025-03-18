import { Router } from "express";
import { addActivity } from "../controller/activityController.js";

const router = Router();

router.post("/activities", addActivity);

export { router as activityRouter };
