import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import { Routes } from "../api/Routes";

export default class Server {
  static start(name: string, port: number, apiEndPoint: string) {
    const app = express();

    app.use(
      cors({
        origin: "*",
        exposedHeaders: ["X-Page", "X-Size", "X-Total-Size"]
      })
    );
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set("port", port);

    app.use(apiEndPoint, new Routes().initRoutes());

    app.get("/", (req: Request, res: Response) => {
      res.send(name);
    });
    app.listen(port, () => {
      return console.log(name + " is listening on " + port);
    });
    return app;
  }
}
