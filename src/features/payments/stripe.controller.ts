import { Request, Response } from "express";
import Stripe from "stripe";
import { env } from "../../config/env";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-06-24.dahlia",
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    const { amount, currency } = req.body;
    
    // Validate inputs
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount", data: null });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ success: false, message: "Stripe secret key is not configured on the server.", data: null });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to smallest currency unit (cents)
      currency: currency || 'usd',
      metadata: {
        userId: user.id,
        userEmail: user.email
      }
    });

    res.status(200).json({
      success: true,
      message: "Payment intent created",
      data: {
        clientSecret: paymentIntent.client_secret,
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};
