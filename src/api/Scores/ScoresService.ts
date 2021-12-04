import BaseService from '../../system/base/BaseService'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import LessonsModel from '../Lessons/LessonsModel'
import ScoresModel from './ScoresModel'
import CoursesModel from '../Courses/CoursesModel'
import StudentsCoursesModel from '../StudentsCourses/studentsCoursesModule'

export default class ScoresService {
	private static ScoresServiceModel = new BaseService(new ScoresModel())
	private static LessonsServiceModel = new BaseService(new LessonsModel())
	private static CoursesServiceModel = new BaseService(new CoursesModel())
	private static StudentsCoursesServiceModel = new BaseService(new StudentsCoursesModel())

	static async createNewScore(data: JSObject, userId: string) {
		HelperClass.checkRequiredField('answer', data, 'string')
		HelperClass.checkRequiredField('taskIndexNumber', data, 'string')
		HelperClass.checkID(data._lessonId)

		const lesson = await ScoresService.LessonsServiceModel.findById(data._lessonId)
		if (!lesson) throw new HttpErrors('No such lesson', HttpErrors.types.BadRequest)

		const recordExists = ScoresService.StudentsCoursesServiceModel.dataExists({
			_coruseId: lesson._courseId,
			_studentId: userId
		})
		if (!recordExists)
			throw new HttpErrors('No such user in course list', HttpErrors.types.Forbidden)

		const mark = lesson.keys[data.taskIndexNumber] == data.answer ? 1 : 0
		const scoreData = {
			mark,
			_studentId: userId,
			_lessonId: data._lessonId
		}

		return await ScoresService.ScoresServiceModel.insertData(scoreData)
	}
}
