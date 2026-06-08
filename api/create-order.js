'use strict';

const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, currency, receipt } = req.body;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('[Create Order] ❌ Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET');
      return res.status(401).json({ error: 'Razorpay credentials not configured on server' });
    }

    if (amount === undefined || typeof amount !== 'number' || amount < 100) {
      return res.status(400).json({ error: 'Amount must be a number >= 100 paise' });
    }

    const payload = JSON.stringify({
      amount: Math.round(amount),
      currency: currency || 'INR',
      receipt: receipt || ('rcpt_' + Date.now()),
    });

    const credentials = Buffer.from(keyId + ':' + keySecret).toString('base64');

    // Call Razorpay API using native https — zero external dependencies
    const order = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.razorpay.com',
        path: '/v1/orders',
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + credentials,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };

      const reqHttp = https.request(options, (resHttp) => {
        let data = '';
        resHttp.on('data', (chunk) => { data += chunk; });
        resHttp.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (resHttp.statusCode >= 400) {
              reject(new Error(parsed.error ? parsed.error.description : JSON.stringify(parsed)));
            } else {
              resolve(parsed);
            }
          } catch (e) {
            reject(new Error('Invalid JSON from Razorpay: ' + data));
          }
        });
      });

      reqHttp.on('error', reject);
      reqHttp.write(payload);
      reqHttp.end();
    });

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
