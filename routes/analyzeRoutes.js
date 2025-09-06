import { Router } from "express";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { analyzeWebsite } from "../controllers/analyzeController.js";

const router = Router();

// POST /api/analyze -> scrape + save website metadata
router.post('/', asyncHandler(analyzeWebsite));

export default router;