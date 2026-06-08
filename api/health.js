'use strict';

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

  return res.status(200).json({
    KEY_ID_present: keyId.length > 0,
    KEY_ID_prefix: keyId.substring(0, 12),        // safe — public key prefix
    KEY_ID_length: keyId.length,
    KEY_SECRET_present: keySecret.length > 0,
    KEY_SECRET_first4: keySecret.substring(0, 4),  // safe — just 4 chars
    KEY_SECRET_length: keySecret.length,
    expected_KEY_ID_prefix: 'rzp_live_Sz7y',
    expected_KEY_SECRET_first4: 'vVzV',
    match_KEY_ID: keyId.startsWith('rzp_live_Sz7y3TCbU7VMEz'),
    match_KEY_SECRET_first4: keySecret.startsWith('vVzV'),
  });
};
