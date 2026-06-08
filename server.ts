import express from 'express';
import dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);
const createOrderHandler = require('./api/create-order.js');
const verifyPaymentHandler = require('./api/verify-payment.js');

const app = express();
app.use(express.json());

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/api/create-order', (req: any, res: any) => createOrderHandler(req, res));
app.post('/api/verify-payment', (req: any, res: any) => verifyPaymentHandler(req, res));

const port = Number(process.env.PORT) || 5001;
app.listen(port, () => {
  console.log(`🚀 [Local Server] Running at http://localhost:${port}`);
});
