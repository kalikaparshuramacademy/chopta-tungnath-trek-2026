import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables for local development (not needed on Vercel but safe)
dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// GET health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// STEP 1: BACKEND - Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    // Validate credentials presence
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("[Create Order] ❌ Razorpay API credentials are missing");
      return res.status(401).json({ error: "Razorpay credentials not configured on server" });
    }

    // Validate amount (minimum 100 paise = 1 INR)
    if (amount === undefined || typeof amount !== 'number') {
      return res.status(400).json({ error: "Amount is required and must be a number" });
    }

    if (amount < 100) {
      return res.status(400).json({ error: "Minimum amount is 100 paise (1 INR)" });
    }

    const options = {
      amount: Math.round(amount),
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`
    };

    console.log("[Create Order] 💸 Initiating order on Razorpay:", options);
    const order = await razorpay.orders.create(options);
    console.log("[Create Order] ✅ Order created successfully:", order.id);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err: any) {
    console.error("[Create Order] ❌ Error creating Razorpay order:", err);
    return res.status(500).json({
      error: "Failed to create Razorpay order",
      details: err.message || err
    });
  }
});

// STEP 3: BACKEND - Verify Signature
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, registration_id } = req.body;

    // Missing fields: return 400
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !registration_id) {
      return res.status(400).json({
        error: "Missing required fields: razorpay_payment_id, razorpay_order_id, razorpay_signature, and registration_id are required"
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("[Verify Payment] ❌ Razorpay key secret is missing");
      return res.status(500).json({ error: "Razorpay secret not configured on server" });
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    // Compare generated signature with razorpay_signature
    if (generatedSignature !== razorpay_signature) {
      console.error("[Verify Payment] ❌ Signature verification failed. Generated:", generatedSignature, "Received:", razorpay_signature);
      return res.status(400).json({ error: "Payment verification failed: Signature mismatch" });
    }

    console.log("[Verify Payment] ✅ Signature verified. Updating database for registration:", registration_id);

    // Update the record to 'paid' in Supabase
    const { data, error } = await supabase
      .from('registrations')
      .update({
        payment_id: razorpay_payment_id,
        payment_status: 'paid',
      })
      .eq('id', registration_id)
      .select();

    if (error) {
      console.error("[Verify Payment] ❌ Supabase Database update error:", error);
      return res.status(500).json({ error: "Failed to update registration status in database", details: error.message });
    }

    console.log("[Verify Payment] 🎉 Payment recorded successfully for registration:", registration_id);
    return res.status(200).json({ success: true, message: "Payment verified and recorded successfully", data });
  } catch (err: any) {
    console.error("[Verify Payment] ❌ Exception during verification:", err);
    return res.status(500).json({ error: "Internal server error during verification", details: err.message || err });
  }
});

export default app;
