import { Request, Response, Router } from 'express';
import { requestGPIOAccess } from 'node-web-gpio';

export const gpioRouter = Router();

// GPIO制御: /gpio/:pin/:value
gpioRouter.get('/:pin/:value', async (req: Request, res: Response) => {
  try {
    const gpioAccess = await requestGPIOAccess();
    const portNum = parseInt(req.params.pin, 10);
    const value = parseInt(req.params.value, 10) ? 1 : 0;

    const port = gpioAccess.ports.get(portNum);
    if (!port) throw new Error(`GPIO port ${portNum} not found`);

    await port.export('out');
    await port.write(value);

    res.send(`GPIO ${portNum} set to ${value}`);
  } catch (err: any) {
    res.status(500).send(`GPIO Error: ${err.message}`);
  }
});
