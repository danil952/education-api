import BaseService from '../../system/base/BaseService'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import LessonsModel from '../Lessons/LessonsModel'
import ScoresModel from './ScoresModel'
import StudentsCoursesModel from '../StudentsCourses/StudentsCoursesModel'

export default class ScoresService {
	private static ScoresServiceModel = new BaseService(new ScoresModel())
	private static LessonsServiceModel = new BaseService(new LessonsModel())
	private static StudentsCoursesServiceModel = new BaseService(new StudentsCoursesModel())

	static async createNewScore(data: JSObject, userId: string) {
		HelperClass.checkRequiredField('_lessonId', data, 'string')
		HelperClass.checkID(data._lessonId)
		HelperClass.checkRequiredField('answerData', data, 'object')

		const lesson = await ScoresService.LessonsServiceModel.findById(data._lessonId)
		if (!lesson) throw new HttpErrors('No such lesson', HttpErrors.types.BadRequest)

		const recordExists = await ScoresService.StudentsCoursesServiceModel.dataExists({
			_courseId: lesson._courseId,
			_studentId: userId
		})
		if (!recordExists)
			throw new HttpErrors('No such user in course list', HttpErrors.types.Forbidden)

		const lessonFinished = await ScoresService.ScoresServiceModel.dataExists({
			_studentId: userId,
			_lessonId: data._lessonId
		})
		if (lessonFinished) throw new HttpErrors('Lesson already finished', HttpErrors.types.BadRequest)

		let totalScore = 0
		data.answerData.forEach((key: string, id: number) => {
			if (lesson.keys[id] === key) {
				totalScore = totalScore + 1
			}
		})
		const scoreData = {
			mark: totalScore,
			_studentId: userId,
			_lessonId: data._lessonId
		}

		return await ScoresService.ScoresServiceModel.insertData(scoreData)
	}
}
