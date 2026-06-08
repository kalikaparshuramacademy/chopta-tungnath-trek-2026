import express from 'express';
import dotenv from 'dotenv';
import createOrderHandler from './api/create-order';
import verifyPaymentHandler from './api/verify-payment';

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

// Map local routes to the same handlers Vercel runs in production
app.post('/api/create-order', async (req, res) => {
  try {
    await createOrderHandler(req as any, res as any);
  } catch (err) {
    console.error("Local create-order error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  try {
    await verifyPaymentHandler(req as any, res as any);
  } catch (err) {
    console.error("Local verify-payment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`🚀 [Local Server] Backend server running at http://localhost:${port}`);
});
