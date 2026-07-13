import { Router } from "express";
import { getDashboardStats, getMonthlyStats } from "./dashboard.controller";

const router = Router();

router.get("/stats", getDashboardStats);
router.get("/monthly", getMonthlyStats);

export default router;
