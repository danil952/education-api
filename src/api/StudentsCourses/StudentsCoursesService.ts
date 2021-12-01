import BaseService from '../../system/base/BaseService'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import CoursesModel from '../Courses/CoursesModel'
import StudentsCoursesModel from './studentsCoursesModule'
import UsersModel from '../Users/UsersModel'

export default class StudentsCoursesService {
	private static StudentsCoursesServiceModel = new BaseService(new StudentsCoursesModel())
	private static CoursesServiceModel = new BaseService(new CoursesModel())
	private static UsersServiceModel = new BaseService(new UsersModel())

	static async createRecord(data: JSObject, userId: string) {
		HelperClass.checkID(data._courseId)
		HelperClass.checkID(data._studentId)

		const course = await StudentsCoursesService.CoursesServiceModel.findById(data._courseId)
		if (!course) throw new HttpErrors('No such course', HttpErrors.types.BadRequest)

		const student = await StudentsCoursesService.UsersServiceModel.findById(data._studentId)
		if (!student) throw new HttpErrors('No such user', HttpErrors.types.BadRequest)

		if (student._id != userId) throw new HttpErrors('Access forbidden', HttpErrors.types.Forbidden)

		return await StudentsCoursesService.StudentsCoursesServiceModel.insertData(data)
	}
}
