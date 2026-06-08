import app from './api/index';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 [Local Server] Backend server running at http://localhost:${port}`);
});
