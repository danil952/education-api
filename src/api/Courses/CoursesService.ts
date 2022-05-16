import Schema from 'mongoose'
import BaseService from '../../system/base/BaseService'
import UsersModel from '../Users/UsersModel'
import CoursesModel from './CoursesModel'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import UsersTypesModel from '../UsersTypes/UsersTypesModel'
import LessonsModel from '../Lessons/LessonsModel'
import ScoresModel from '../Scores/ScoresModel'

export default class CoursesService {
	private static CoursesServiceModel = new BaseService(new CoursesModel())
	private static UsersServiceModel = new BaseService(new UsersModel())
	private static UsersTypesServiceModel = new BaseService(new UsersTypesModel())
	private static LessonsServiceModel = new BaseService(new LessonsModel())
	private static ScoresServiceModel = new BaseService(new ScoresModel())

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
		const lessons =
			(await CoursesService.LessonsServiceModel.getDataByQuery({
				_courseId: course._id
			})) || []

		for (const lesson of lessons) {
			await CoursesService.LessonsServiceModel.deleteData(lesson._id)
			const scores =
				(await CoursesService.ScoresServiceModel.getDataByQuery({
					_lessonId: lesson._id
				})) || []

			for (const score of scores) {
				await CoursesService.ScoresServiceModel.deleteData(score._id)
			}
		}

		return await CoursesService.CoursesServiceModel.deleteData(_courseId)
	}

	static async getCourses() {
		const pipeline = CoursesModel.teacherInfoAggregation()
		return await CoursesService.CoursesServiceModel.groupBy(pipeline)
	}

	static async getCoursesProfessor(_teacherId: string) {
		const pipeline = [
			{
				$match: { _teacherId: Schema.Types.ObjectId(_teacherId) }
			},
			...CoursesModel.LessonsInfoAggregation()
		]
		return await CoursesService.CoursesServiceModel.groupBy(pipeline)
	}
}
