const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3001;

let healthy = true;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.send(`Hello from User Service - Pod: ${os.hostname()}`);
});

app.get('/healthz', (req, res) => {
  if (healthy) {
    res.status(200).send('Healthy');
  } else {
    res.status(500).send('Unhealthy');
  }
});

app.get('/toggle-health', (req, res) => {
  healthy = !healthy;
  res.send(`Health status toggled. Current: ${healthy ? 'Healthy' : 'Unhealthy'}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`User Service is running on port ${PORT}`);
});