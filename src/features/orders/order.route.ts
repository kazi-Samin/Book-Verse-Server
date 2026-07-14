import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { getMyOrders, createOrder, getAllOrders, updateOrderStatus } from "./order.controller";

const router = Router();

router.get("/my-orders", requireAuth, getMyOrders);
router.post("/", requireAuth, createOrder);
router.get("/all", requireAuth, getAllOrders);
router.patch("/:id/status", requireAuth, updateOrderStatus);

export default router;
