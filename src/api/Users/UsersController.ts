import { Request, Response } from 'express'
import { JSObject } from '../../helpers/HelpersInterfaces'
import BaseController from '../../system/base/BaseController'
import BaseRestInterface from '../../system/base/BaseRestInterface'
import UsersService from './UsersService'

export default class UsersController extends BaseController {
	static async createUser(req: Request, res: Response) {
		const data: JSObject = req.body
		try {
			const newUser = await UsersService.createNewUser(data, 'student')
			res.status(201).send(new BaseRestInterface(201, 'success', newUser).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
