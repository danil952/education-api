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
			const newData = {
				fio: newUser.fio,
				login: newUser.login
			}
			res.status(201).send(new BaseRestInterface(201, 'success', newData).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async updateUser(req: JSObject, res: Response) {
		try {
			const data: JSObject = req.body
			data._userId = req.jwt.id
			const { _id } = req.params as { _id: string }

			const updatedUser = await UsersService.updateUser(data, _id)
			const resData = {
				fio: updatedUser.fio,
				login: updatedUser.login
			}
			res.status(201).send(new BaseRestInterface(201, 'success', resData).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async getUserInfo(req: Request, res: Response) {
		try {
			const { login } = req.params as { login: string }
			const data = await UsersService.getUserDataByLogin(login)
			res.status(200).send(new BaseRestInterface(200, 'success', data).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async deleteUser(req: JSObject, res: Response) {
		try {
			const data: JSObject = req.body
			const { _id } = req.params as { _id: string }

			const deletedUser = await UsersService.deleteUser(_id)
			res.status(201).send(new BaseRestInterface(201, 'success', deletedUser).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async createProfessor(req: Request, res: Response) {
		const data: JSObject = req.body
		try {
			const newUser = await UsersService.createNewUser(data, 'professor')
			const newData = {
				fio: newUser.fio,
				login: newUser.login
			}
			res.status(201).send(new BaseRestInterface(201, 'success', newData).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async getProfessors(req: Request, res: Response) {
		try {
			const data = await UsersService.getProfessorsData()
			res.status(200).send(new BaseRestInterface(200, 'success', data).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
