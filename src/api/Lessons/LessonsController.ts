import { Request, Response } from 'express'
import { JSObject } from '../../helpers/HelpersInterfaces'
import BaseController from '../../system/base/BaseController'
import BaseRestInterface from '../../system/base/BaseRestInterface'
import LessonsService from './LessonsService'

export default class LessonsController extends BaseController {
	static async createLesson(req: JSObject, res: Response) {
		const data: JSObject = req.body
		const _teacherId: string = req.jwt.id
		try {
			const newLesson = await LessonsService.createNewLesson(data, _teacherId)
			res.status(201).send(new BaseRestInterface(201, 'success', newLesson).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async updateLesson(req: JSObject, res: Response) {
		const data: JSObject = req.body
		const { _id } = req.params as { _id: string }
		const _teacherId: string = req.jwt.id
		try {
			const updatedLesson = await LessonsService.updateLesson(data, _id, _teacherId)
			res.status(201).send(new BaseRestInterface(201, 'success', updatedLesson).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async getLessonsCourse(req: JSObject, res: Response) {
		try {
			const { _id } = req.params as { _id: string }

			const lessons = await LessonsService.getLessonsByCourseId(_id)
			res.status(201).send(new BaseRestInterface(201, 'success', lessons).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async getLessonById(req: JSObject, res: Response) {
		try {
			const { _id } = req.params as { _id: string }

			const lesson = await LessonsService.getLessonsById(_id)
			res.status(201).send(new BaseRestInterface(201, 'success', lesson).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
