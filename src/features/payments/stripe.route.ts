import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { createPaymentIntent } from "./stripe.controller";

const router = Router();

// All payment routes require authentication
router.use(requireAuth);

router.post("/create-payment-intent", createPaymentIntent);

export default router;
