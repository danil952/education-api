import { Router } from "express";
import AuthController from "./AuthController";

export default class AuthRoutes {
  static init(_route: Router) {
    _route.post("/auth/login", AuthController.login);
  }
}
