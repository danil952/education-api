import { Request, Response } from 'express'
import { JSObject } from '../../helpers/HelpersInterfaces'
import BaseController from '../../system/base/BaseController'
import BaseRestInterface from '../../system/base/BaseRestInterface'
import StudentsCoursesService from './studentsCoursesService'

export default class StudentsCoursesController extends BaseController {
	static async createRecord(req: JSObject, res: Response) {
		const data: JSObject = req.body
		const userId: string = req.jwt.id
		try {
			const newRecord = await StudentsCoursesService.createRecord(data, userId)
			res.status(201).send(new BaseRestInterface(201, 'success', newRecord).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
