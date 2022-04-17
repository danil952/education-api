import Schema from 'mongoose'
import BaseModel from '../../system/base/BaseModel'

export default class StudentsCoursesModel extends BaseModel {
	constructor() {
		super(
			'studentsCourses',
			{
				_courseId: { ref: 'courses', type: Schema.Types.ObjectId },
				_studentId: { ref: 'users', type: Schema.Types.ObjectId }
			},
			{ timestamps: true },
			[{ _studentId: -1 }]
		)
	}
}
