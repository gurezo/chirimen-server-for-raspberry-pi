import { Request, Response } from "express";
import { GPIOAccess } from "node-web-gpio";
const { requestGPIOAccess } = require("node-web-gpio");

// interface HelloResponse {
//   hello: string;
// }
// type HelloBuilder = (name: string) => HelloResponse;
// const helloBuilder: HelloBuilder = (name) => ({ hello: name });

// type GPIOAccessBuilder = () => void;
// const gpioAccessBuilder: GPIOAccessBuilder = () => {};

let gpioAccess: GPIOAccess;
let ports: any;

interface GpioAccessResponse {
  status: string;
}
type GpioAccessBuilder = (name: string) => GpioAccessResponse;
const gpioAccessBuilder: GpioAccessBuilder = (status: string) => ({ status });

interface GpioPortsGetResponse {
  status: string;
}

type GpioPortsGetBuilder = (name: string) => GpioPortsGetResponse;
const gpioPortsGetBuilder: GpioPortsGetBuilder = (status: string) => ({
  status,
});

interface GpioPortWriteResponse {
  status: string;
}

type GpioPortWriteBuilder = (name: string) => GpioPortWriteResponse;
const gpioPortWriteBuilder: GpioPortWriteBuilder = (status: string) => ({
  status,
});

export const rootHandler = (_req: Request, res: Response) => {
  return res.send("Hello, Your API is working!!");
};

// export const helloHandler = (req: Request, res: Response) => {
//   const { params } = req;
//   const { name = "World" } = params;
//   const response = helloBuilder(name);

//   return res.json(response);
// };

const okRsponse = { status: "ok" };
const errorRsponse = (error: any) => ({
  status: "error",
  error,
});

const customThrower = (message: string) => {
  throw Error(message);
};

// const isPortsUndefined = () => ({ throw new Error("posrt is undefined"); });
const commonHandler = (func: Function): { status: string; error?: any } => {
  try {
    func();
    return okRsponse;
  } catch (error) {
    return errorRsponse(error);
  }
};

export const gpioAccessHandler = async (req: Request, res: Response) => {
  const response = gpioAccessBuilder("@@@@ gpioAccessBuilder");
  return res.json(response);

  // let response = {};
  // commonHandler(await requestGPIOAccess());
  // try {
  //   gpioAccess = await requestGPIOAccess();
  //   response = okRsponse;
  // } catch (error) {
  //   response = errorRsponse(error);
  // } finally {
  //   return res.json(response);
  // }
};

export const gpioPortsGetHandler = async (req: Request, res: Response) => {
  const response = gpioPortsGetBuilder("#### gpioPortsGetBuilder");
  return res.json(response);
  // const { params } = req;
  // let response = {};
  // // if (!ports) {
  // //   throw new Error("posrt is undefined");
  // // }
  // try {
  //   ports = !ports
  //     ? customThrower("posrt is undefined")
  //     : gpioAccess.ports.get(parseInt("26", 10));
  //   response = okRsponse;
  // } catch (error) {
  //   response = errorRsponse(error);
  // } finally {
  //   return res.json(response);
  // }
};

export const gpioPortWriteHandler = async (req: Request, res: Response) => {
  const response = gpioPortWriteBuilder("%%%% gpioPortWriteBuilder");
  return res.json(response);
  //   const { params } = req;
  //   let response = {};
  //   try {
  //     port.write(1);
  //     response = okRsponse;
  //   } catch (error) {
  //     response = errorRsponse(error);
  //   } finally {
  //     return res.json(response);
  //   }
};
