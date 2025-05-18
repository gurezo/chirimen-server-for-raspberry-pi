import express from 'express';
import { gpioRouter } from './routes/gpio';
import { i2cRouter } from './routes/i2c';

const app = express();
const port = 3000;

app.use('/gpio', gpioRouter);
app.use('/i2c', i2cRouter);

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript + Express + node-web-gpio + node-web-i2c!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
