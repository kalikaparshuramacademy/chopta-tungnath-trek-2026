'use strict';

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = async function handler(req, res) {
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
        error: 'Missing required fields: razorpay_payment_id, razorpay_order_id, razorpay_signature, registration_id',
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('[Verify Payment] ❌ RAZORPAY_KEY_SECRET is missing');
      return res.status(500).json({ error: 'Razorpay secret not configured on server' });
    }

    // HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error('[Verify Payment] ❌ Signature mismatch');
      return res.status(400).json({ error: 'Payment verification failed: Signature mismatch' });
    }

    console.log('[Verify Payment] ✅ Signature valid. Updating DB for registration:', registration_id);

    const { data, error } = await supabase
      .from('registrations')
      .update({
        payment_id: razorpay_payment_id,
        payment_status: 'paid',
      })
      .eq('id', registration_id)
      .select();

    if (error) {
      console.error('[Verify Payment] ❌ Supabase update error:', error);
      return res.status(500).json({ error: 'Database update failed', details: error.message });
    }

    console.log('[Verify Payment] 🎉 Payment recorded for registration:', registration_id);
    return res.status(200).json({ success: true, message: 'Payment verified and recorded', data });
  } catch (err) {
    console.error('[Verify Payment] ❌ Exception:', err.message || err);
    return res.status(500).json({ error: 'Internal server error', details: err.message || String(err) });
  }
};
