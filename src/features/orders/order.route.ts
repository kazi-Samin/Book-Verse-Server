import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { getMyOrders, createOrder } from "./order.controller";

const router = Router();

// All order routes require authentication
router.use(requireAuth);

router.get("/my-orders", getMyOrders);
router.post("/", createOrder);

export default router;
