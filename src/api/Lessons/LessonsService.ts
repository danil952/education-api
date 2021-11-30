import BaseService from '../../system/base/BaseService'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import LessonsModel from './LessonsModule'
import CoursesModel from '../Courses/CoursesModel'

export default class LessonsService {
	private static LessonsServiceModel = new BaseService(new LessonsModel())
	private static CoursesServiceModel = new BaseService(new CoursesModel())

	static async createNewLesson(data: JSObject, _teacherId: string) {
		HelperClass.checkID(data._courseId)
		HelperClass.checkRequiredField('indexNumber', data, 'number')

		const course = await LessonsService.CoursesServiceModel.findById(data._courseId)
		if (!course || course._id.toString() !== _teacherId)
			throw new HttpErrors('No access for this course', HttpErrors.types.Forbidden)

		return await LessonsService.LessonsServiceModel.insertData(data)
	}
}
