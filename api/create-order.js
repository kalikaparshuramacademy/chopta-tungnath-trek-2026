'use strict';

const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

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
    const { amount, currency, receipt } = req.body;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('[Create Order] ❌ Razorpay credentials are missing from environment');
      return res.status(401).json({ error: 'Razorpay credentials not configured on server' });
    }

    if (amount === undefined || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Amount is required and must be a number' });
    }

    if (amount < 100) {
      return res.status(400).json({ error: 'Minimum amount is 100 paise (₹1)' });
    }

    const options = {
      amount: Math.round(amount),
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    console.log('[Create Order] 💸 Creating order:', options);
    const order = await razorpay.orders.create(options);
    console.log('[Create Order] ✅ Order created:', order.id);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error('[Create Order] ❌ Error:', err.message || err);
    return res.status(500).json({
      error: 'Failed to create Razorpay order',
      details: err.message || String(err),
    });
  }
};
