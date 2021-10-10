import BaseRestInterface from "./BaseRestInterface";

export default class BaseController {
  static resStatus(e: any, res: any) {
    res
      .status(e.code ?? 400)
      .send(
        new BaseRestInterface(e.code ?? 400, "error", e.message).formatObject()
      );
  }
}
