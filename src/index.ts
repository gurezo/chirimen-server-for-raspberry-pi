import express from "express";
import {
  /** helloHandler, */ gpioAccessHandler,
  rootHandler,
} from "./handlers";

const app = express();
const port = process.env.PORT || "8000";

app.get("/", rootHandler);
// app.get("/hello/:name", helloHandler);

app.get("/gpio/access", gpioAccessHandler);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
