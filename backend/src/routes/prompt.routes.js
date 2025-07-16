import express from "express";
const router = express.Router();
import { handlePrompt } from "../controllers/prompt.controller.js";

router.post("/", handlePrompt);

export { router as promptRoutes };
