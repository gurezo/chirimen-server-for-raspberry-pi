import { Request, Response, Router } from 'express';
import { requestI2CAccess } from 'node-web-i2c';

export const i2cRouter = Router();

// TODO
/**
 * port get =>  I2CPortMap
 *
 */

// I2Cスキャン: /i2c/scan
i2cRouter.get('/scan', async (_req: Request, res: Response) => {
  try {
    const i2cAccess = await requestI2CAccess();
    const i2cPort = i2cAccess.ports.get(1); // bus 1

    if (!i2cPort) throw new Error('I2C port 1 not found');

    const devices: string[] = [];
    for (let addr = 0x03; addr <= 0x77; addr++) {
      try {
        const device = await i2cPort.open(addr);
        await device.writeByte(0x00);
        devices.push(`0x${addr.toString(16)}`);
      } catch {
        // 応答なし → 無視
      }
    }

    res.send(`I2C devices found: ${devices.join(', ')}`);
  } catch (err: any) {
    res.status(500).send(`I2C Error: ${err.message}`);
  }
});
