import { Request, Response } from 'express'
import { JSObject } from '../../helpers/HelpersInterfaces'
import BaseController from '../../system/base/BaseController'
import BaseRestInterface from '../../system/base/BaseRestInterface'
import LessonsService from './LessonsService'

export default class LessonsController extends BaseController {
	static async createLesson(req: JSObject, res: Response) {
		const data: JSObject = req.body
		const _teacherId: string = req.jwt.data._id
		try {
			const newLesson = await LessonsService.createNewLesson(data, _teacherId)
			res.status(201).send(new BaseRestInterface(201, 'success', newLesson).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
