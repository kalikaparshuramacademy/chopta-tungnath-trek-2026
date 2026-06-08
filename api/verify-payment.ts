import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, registration_id } = req.body;

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
}
