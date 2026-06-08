import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, receipt } = req.body;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("[Create Order] ❌ Razorpay API credentials are missing");
      return res.status(401).json({ error: "Razorpay credentials not configured on server" });
    }

    if (amount === undefined || typeof amount !== 'number') {
      return res.status(400).json({ error: "Amount is required and must be a number" });
    }

    if (amount < 100) {
      return res.status(400).json({ error: "Minimum amount is 100 paise (1 INR)" });
    }

    const options = {
      amount: Math.round(amount),
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    console.log("[Create Order] 💸 Initiating order on Razorpay:", options);
    const order = await razorpay.orders.create(options);
    console.log("[Create Order] ✅ Order created successfully:", order.id);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    console.error("[Create Order] ❌ Error creating Razorpay order:", err);
    return res.status(500).json({
      error: "Failed to create Razorpay order",
      details: err.message || err,
    });
  }
}
