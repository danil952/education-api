import BaseService from '../../system/base/BaseService'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import LessonsModel from './LessonsModel'
import CoursesModel from '../Courses/CoursesModel'

export default class LessonsService {
	private static LessonsServiceModel = new BaseService(new LessonsModel())
	private static CoursesServiceModel = new BaseService(new CoursesModel())

	static async createNewLesson(data: JSObject, _teacherId: string) {
		HelperClass.checkRequiredField('_courseId', data, 'string')
		HelperClass.checkID(data._courseId)
		HelperClass.checkRequiredField('indexNumber', data, 'number')
		HelperClass.checkRequiredField('name', data, 'string')

		const course = await LessonsService.CoursesServiceModel.findById(data._courseId)
		if (!course || course._teacherId.toString() !== _teacherId)
			throw new HttpErrors('No access for this course', HttpErrors.types.Forbidden)

		const indexNumberUsed = await LessonsService.LessonsServiceModel.dataExists({
			indexNumber: data.indexNumber
		})
		if (indexNumberUsed) throw new HttpErrors('Index number is in use', HttpErrors.types.BadRequest)

		return await LessonsService.LessonsServiceModel.insertData(data)
	}

	static async updateLesson(data: JSObject, _id: string, _teacherId: string) {
		const lesson = await LessonsService.LessonsServiceModel.findById(_id)
		if (!lesson) throw new HttpErrors('No such lesson', HttpErrors.types.BadRequest)

		const course = await LessonsService.CoursesServiceModel.findById(data._courseId)
		if (!course || course._teacherId.toString() !== _teacherId)
			throw new HttpErrors('No access for this course', HttpErrors.types.Forbidden)

		if (data.indexNumber) {
			const indexNumberUsed = await LessonsService.LessonsServiceModel.dataExists({
				indexNumber: data.indexNumber
			})
			if (indexNumberUsed)
				throw new HttpErrors('Index number is in use', HttpErrors.types.BadRequest)

			lesson.indexNumber = data.indexNumber
		}

		if (data.name) lesson.name = data.name
		if (data.lecture) lesson.lecture = data.lecture
		if (data.keys) lesson.keys = data.keys

		return await LessonsService.LessonsServiceModel.updateData(_id, lesson, { new: true })
	}

	static async getLessonsByCourseId(_courseId: string) {
		return (await LessonsService.LessonsServiceModel.getDataByQuery({ _courseId })) || []
	}

	static async getLessonsById(_id: string) {
		return await LessonsService.LessonsServiceModel.findById(_id)
	}
}
