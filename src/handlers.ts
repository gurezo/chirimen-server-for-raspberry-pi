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
  let response = {};
  commonHandler(await requestGPIOAccess());

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
  const { params } = req;
  let response = {};
  // if (!ports) {
  //   throw new Error("posrt is undefined");
  // }
  try {
    ports = !ports
      ? customThrower("posrt is undefined")
      : gpioAccess.ports.get(parseInt("26", 10));
    response = okRsponse;
  } catch (error) {
    response = errorRsponse(error);
  } finally {
    return res.json(response);
  }
};

// export const gpioPortWriteHandler = async (req: Request, res: Response) => {
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
// };
