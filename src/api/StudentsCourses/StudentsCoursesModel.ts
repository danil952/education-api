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

	static CoursesInfoAggregation() {
		return [
			{
				$lookup: {
					from: 'courses',
					localField: '_courseId',
					foreignField: '_id',
					as: 'courseData'
				}
			},
			{ $unwind: { path: '$courseData', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'users',
					localField: 'courseData._teacherId',
					foreignField: '_id',
					as: 'teacher'
				}
			},
			{ $unwind: '$teacher' },
			{
				$project: {
					__v: 0,
					createdAt: 0,
					updatedAt: 0
				}
			}
		]
	}
}
