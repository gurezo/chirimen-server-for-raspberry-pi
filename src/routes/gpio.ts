import { Request, RequestHandler, Response, Router } from 'express';
import { requestGPIOAccess } from 'node-web-gpio';

export const gpioRouter = Router();

// Initialize GPIO access at module load
let gpioAccess: Awaited<ReturnType<typeof requestGPIOAccess>> | null = null;

// Initialize GPIO access immediately
requestGPIOAccess()
  .then((access) => {
    gpioAccess = access;
    console.log('GPIO access initialized');
  })
  .catch((err) => {
    console.error('Failed to initialize GPIO access:', err);
  });

// TODO
/**
 * port get => GPIOPortMap
 *
 * port write => GPIO
 *
 * GET /gpio/port => GPIOPortMap
 *
 * POST /gpio/port => GPIO
 *  parameter 書き込みデータ
 *
 * POST /gpio/export => GPIO
 *  parameter
 *      port (GPIOPortMap)
 *      direction (in/out)
 *
 */

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

// GET /gpio/port - Get available GPIO ports
gpioRouter.get('/port', (async (req: Request, res: Response) => {
  try {
    if (!gpioAccess) {
      return res.status(503).send('GPIO access not initialized');
    }
    const ports = Array.from(gpioAccess.ports.entries()).map(
      ([port, gpio]) => ({
        port,
        direction: gpio.direction,
      })
    );
    res.json(ports);
  } catch (err: any) {
    res.status(500).send(`GPIO Error: ${err.message}`);
  }
}) as RequestHandler);

// POST /gpio/port - Write value to specified port
gpioRouter.post('/port', (async (req: Request, res: Response) => {
  try {
    if (!gpioAccess) {
      return res.status(503).send('GPIO access not initialized');
    }
    const { port, value } = req.body;
    if (typeof port !== 'number' || typeof value !== 'number') {
      return res
        .status(400)
        .send('Invalid parameters: port and value must be numbers');
    }

    const gpioPort = gpioAccess.ports.get(port);
    if (!gpioPort) {
      return res.status(404).send(`GPIO port ${port} not found`);
    }

    await gpioPort.export('out');
    await gpioPort.write(value ? 1 : 0);
    res.send(`GPIO ${port} set to ${value}`);
  } catch (err: any) {
    res.status(500).send(`GPIO Error: ${err.message}`);
  }
}) as RequestHandler);

// POST /gpio/export - Export port with specified direction
gpioRouter.post('/export', (async (req: Request, res: Response) => {
  try {
    if (!gpioAccess) {
      return res.status(503).send('GPIO access not initialized');
    }
    const { port, direction } = req.body;
    if (typeof port !== 'number' || !['in', 'out'].includes(direction)) {
      return res
        .status(400)
        .send(
          'Invalid parameters: port must be a number and direction must be "in" or "out"'
        );
    }

    const gpioPort = gpioAccess.ports.get(port);
    if (!gpioPort) {
      return res.status(404).send(`GPIO port ${port} not found`);
    }

    await gpioPort.export(direction);
    res.send(`GPIO ${port} exported as ${direction}`);
  } catch (err: any) {
    res.status(500).send(`GPIO Error: ${err.message}`);
  }
}) as RequestHandler);
