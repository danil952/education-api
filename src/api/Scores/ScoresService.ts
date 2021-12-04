import BaseService from '../../system/base/BaseService'
import HelperClass from '../../helpers/HelperClass'
import { JSObject } from '../../helpers/HelpersInterfaces'
import HttpErrors from '../../helpers/ErrorsHTTP'
import LessonsModel from '../Lessons/LessonsModel'
import ScoresModel from './ScoresModel'

export default class ScoresService {
	private static ScoresServiceModel = new BaseService(new ScoresModel())
	private static LessonsServiceModel = new BaseService(new LessonsModel())

	static async createNewScore(data: JSObject, userId: string) {
		HelperClass.checkRequiredField('answer', data, 'string')
		HelperClass.checkRequiredField('taskIndexNumber', data, 'string')
		HelperClass.checkID(data._lessonId)

		const lesson = await ScoresService.LessonsServiceModel.findById(data._lessonId)
		if (!lesson) throw new HttpErrors('No such lesson', HttpErrors.types.BadRequest)

		const mark = lesson.keys[data.taskIndexNumber] == data.answer ? 1 : 0
		const scoreData = {
			mark,
			_studentId: userId,
			_lessonId: data._lessonId
		}

		return await ScoresService.ScoresServiceModel.insertData(scoreData)
	}
}
