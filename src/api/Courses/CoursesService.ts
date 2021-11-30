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

		const user = await CoursesService.UsersServiceModel.findById(data._teacherId)
		if (!user) throw new HttpErrors('No such user', HttpErrors.types.BadRequest)

		const userType = await CoursesService.UsersTypesServiceModel.findById(user.type)
		if (userType.name !== 'teacher')
			throw new HttpErrors('User type error', HttpErrors.types.Conflict)

		return await CoursesService.CoursesServiceModel.insertData(data)
	}

	static async getCourses() {
		const pipeline = CoursesModel.teacherInfoAggregation()
		return await CoursesService.CoursesServiceModel.groupBy(pipeline)
	}
}
