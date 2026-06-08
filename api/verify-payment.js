'use strict';

const crypto = require('crypto');
const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, registration_id } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !registration_id) {
      return res.status(400).json({
        error: 'Missing fields: razorpay_payment_id, razorpay_order_id, razorpay_signature, registration_id',
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('[Verify Payment] ❌ Missing RAZORPAY_KEY_SECRET');
      return res.status(500).json({ error: 'Razorpay secret not configured on server' });
    }

    // HMAC-SHA256 signature verification — native crypto only
    const text = razorpay_order_id + '|' + razorpay_payment_id;
    const generatedSignature = crypto.createHmac('sha256', secret).update(text).digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error('[Verify Payment] ❌ Signature mismatch');
      return res.status(400).json({ error: 'Payment verification failed: Signature mismatch' });
    }

    console.log('[Verify Payment] ✅ Signature valid. Updating DB for registration:', registration_id);

    // Update Supabase via REST API — zero external dependencies
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('[Verify Payment] ❌ Missing Supabase credentials');
      return res.status(500).json({ error: 'Database credentials not configured on server' });
    }

    const payload = JSON.stringify({
      payment_id: razorpay_payment_id,
      payment_status: 'paid',
    });

    const url = new URL('/rest/v1/registrations?id=eq.' + registration_id, supabaseUrl);

    await new Promise((resolve, reject) => {
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': 'Bearer ' + supabaseKey,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'Prefer': 'return=representation',
        },
      };

      const reqHttp = https.request(options, (resHttp) => {
        let data = '';
        resHttp.on('data', (chunk) => { data += chunk; });
        resHttp.on('end', () => {
          if (resHttp.statusCode >= 400) {
            reject(new Error('Supabase update failed: ' + data));
          } else {
            resolve(data);
          }
        });
      });

      reqHttp.on('error', reject);
      reqHttp.write(payload);
      reqHttp.end();
    });

    console.log('[Verify Payment] 🎉 Payment recorded for registration:', registration_id);
    return res.status(200).json({ success: true, message: 'Payment verified and recorded' });
  } catch (err) {
    console.error('[Verify Payment] ❌ Exception:', err.message || err);
    return res.status(500).json({ error: 'Internal server error', details: err.message || String(err) });
  }
};
