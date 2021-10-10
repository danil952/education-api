import { doesNotMatch } from "assert";
import { NextFunction, Request, Response } from "express";
import HttpErrors from "../../helpers/ErrorsHTTP";
import BaseController from "../../system/base/BaseController";
import AuthService from "./AuthService";

export default class AuthController {
  static async checkJWT(req: Request, res: Response, next: NextFunction) {
    try {
      AuthService.verifyToken(req);
      return next();
    } catch (e) {
      BaseController.resStatus(e, res);
    }
  }

  static async middlewareProfessor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      AuthService.checkUserType(req, "professor");
      return next();
    } catch (e) {
      BaseController.resStatus(e, res);
    }
  }

  static async middlewareAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      AuthService.checkUserType(req, "admin");
      return next();
    } catch (e) {
      BaseController.resStatus(e, res);
    }
  }
}
