import { JSObject } from '../../helpers/HelpersInterfaces'
import { NextFunction, Request, Response } from 'express'
import BaseRestInterface from '../../system/base/BaseRestInterface'
import BaseController from '../../system/base/BaseController'
import AuthService from './AuthService'

export default class AuthController {
	static async checkJWT(req: Request, res: Response, next: NextFunction) {
		try {
			AuthService.verifyToken(req)
			return next()
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const data: JSObject = req.body
			const token = await AuthService.signToken(data)
			res.status(201).send(new BaseRestInterface(201, 'success', token).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async middlewareProfessor(req: Request, res: Response, next: NextFunction) {
		try {
			AuthService.checkUserType(req, 'professor')
			return next()
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async middlewareAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			AuthService.checkUserType(req, 'admin')
			return next()
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
