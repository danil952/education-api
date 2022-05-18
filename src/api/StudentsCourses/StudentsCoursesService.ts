import Schema from 'mongoose'
import BaseService from '../../system/base/BaseService'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import CoursesModel from '../Courses/CoursesModel'
import StudentsCoursesModel from './StudentsCoursesModel'
import UsersModel from '../Users/UsersModel'

export default class StudentsCoursesService {
	private static StudentsCoursesServiceModel = new BaseService(new StudentsCoursesModel())
	private static CoursesServiceModel = new BaseService(new CoursesModel())
	private static UsersServiceModel = new BaseService(new UsersModel())

	static async createRecord(data: JSObject, userId: string) {
		HelperClass.checkRequiredField('_courseId', data, 'string')
		HelperClass.checkID(data._courseId)
		HelperClass.checkID(userId)

		const recordExists = await StudentsCoursesService.CoursesServiceModel.findOne({
			_courseId: Schema.Types.ObjectId(data._courseId),
			_studentId: Schema.Types.ObjectId(userId)
		})
		if (recordExists) throw new HttpErrors('Record exists', HttpErrors.types.BadRequest)

		const course = await StudentsCoursesService.CoursesServiceModel.findById(data._courseId)
		if (!course) throw new HttpErrors('No such course', HttpErrors.types.BadRequest)

		const student = await StudentsCoursesService.UsersServiceModel.findById(userId)
		if (!student) throw new HttpErrors('No such user', HttpErrors.types.BadRequest)

		if (student._id != userId) throw new HttpErrors('Access forbidden', HttpErrors.types.Forbidden)

		data._studentId = userId

		return await StudentsCoursesService.StudentsCoursesServiceModel.insertData(data)
	}

	static async getStudentCourses(studentId: string) {
		const pipeline = [
			{
				$match: { _studentId: Schema.Types.ObjectId(studentId) }
			},
			...StudentsCoursesModel.CoursesInfoAggregation()
		]

		return await StudentsCoursesService.StudentsCoursesServiceModel.groupBy(pipeline)
	}
}
