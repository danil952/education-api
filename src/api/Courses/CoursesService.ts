import BaseService from '../../system/base/BaseService'
import UsersModel from '../Users/UsersModel'
import CoursesModel from './CoursesModel'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import UsersTypesModel from '../UsersTypes/UsersTypesModel'

export default class CoursesService {
	private static CoursesServiceModel = new BaseService(new CoursesModel())
	private static UsersServiceModel = new BaseService(new UsersModel())
	private static UsersTypesServiceModel = new BaseService(new UsersTypesModel())

	static async createNewCourse(data: JSObject) {
		HelperClass.checkRequiredField('name', data, 'string')
		HelperClass.checkRequiredField('description', data, 'string')
		HelperClass.checkRequiredField('_teacherId', data, 'string')
		HelperClass.checkID(data._teacherId)

		const user = await CoursesService.UsersServiceModel.findById(data._teacherId)
		if (!user) throw new HttpErrors('No such user', HttpErrors.types.BadRequest)

		const userType = await CoursesService.UsersTypesServiceModel.findById(user.type)
		if (userType.type !== 'professor')
			throw new HttpErrors('User type error', HttpErrors.types.Conflict)

		return await CoursesService.CoursesServiceModel.insertData(data)
	}

	static async updateCourse(data: JSObject, _courseId: string) {
		HelperClass.checkRequiredField('name', data, 'string')
		HelperClass.checkRequiredField('description', data, 'string')
		HelperClass.checkRequiredField('_teacherId', data, 'string')
		HelperClass.checkID(data._teacherId)
		HelperClass.checkID(_courseId)

		const user = await CoursesService.UsersServiceModel.findById(data._teacherId)
		if (!user) throw new HttpErrors('No such user', HttpErrors.types.BadRequest)

		const userType = await CoursesService.UsersTypesServiceModel.findById(user.type)
		if (userType.type !== 'professor')
			throw new HttpErrors('User type error', HttpErrors.types.Conflict)

		return await CoursesService.CoursesServiceModel.updateData(_courseId, data, { new: true })
	}

	static async deleteCourse(_courseId: string) {
		HelperClass.checkID(_courseId)
		const course = await CoursesService.CoursesServiceModel.findById(_courseId)
		if (!course) throw new HttpErrors('No such course', HttpErrors.types.BadRequest)

		return await CoursesService.CoursesServiceModel.deleteData(_courseId)
	}

	static async getCourses() {
		const pipeline = CoursesModel.teacherInfoAggregation()
		return await CoursesService.CoursesServiceModel.groupBy(pipeline)
	}
}
