import express from "express";

import { authenticateUser } from "../middleware/authenticate.js";
import { getUserHomePage, getProfileLogPage } from "../controller/appController.js";
import { errorHandlerWrapper } from "../errorHandler/errorHandler.js";

const router = express.Router();

// Home page where user info is displayed.
router.get(
    "/",
    authenticateUser,
    errorHandlerWrapper(getUserHomePage, "controller/appController"),
);

router.get(
    "/profilelog",
    errorHandlerWrapper(getProfileLogPage, "controller/appController"),
);

export { router as appRouter };
