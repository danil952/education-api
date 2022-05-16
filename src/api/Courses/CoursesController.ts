import { Request, Response } from 'express'
import { JSObject } from '../../helpers/HelpersInterfaces'
import BaseController from '../../system/base/BaseController'
import BaseRestInterface from '../../system/base/BaseRestInterface'
import CoursesService from './CoursesService'

export default class CoursesController extends BaseController {
	static async createCourse(req: Request, res: Response) {
		const data: JSObject = req.body
		try {
			const newCourse = await CoursesService.createNewCourse(data)
			res.status(201).send(new BaseRestInterface(201, 'success', newCourse).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async updateCourse(req: Request, res: Response) {
		const data: JSObject = req.body
		try {
			const { _id } = req.params as { _id: string }
			const updatedCourse = await CoursesService.updateCourse(data, _id)
			res.status(201).send(new BaseRestInterface(201, 'success', updatedCourse).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async deleteCourse(req: Request, res: Response) {
		const data: JSObject = req.body
		try {
			const { _id } = req.params as { _id: string }
			const deletedCourse = await CoursesService.deleteCourse(_id)
			res.status(201).send(new BaseRestInterface(201, 'success', deletedCourse).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async getCourses(req: Request, res: Response) {
		try {
			const records = await CoursesService.getCourses()
			res.status(201).send(new BaseRestInterface(200, 'success', records).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}

	static async getCoursesProfessor(req: JSObject, res: Response) {
		try {
			const _teacherId = req.jwt.id
			const records = await CoursesService.getCoursesProfessor(_teacherId)
			res.status(201).send(new BaseRestInterface(200, 'success', records).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
