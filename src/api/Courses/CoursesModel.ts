import Schema from 'mongoose'
import BaseModel from '../../system/base/BaseModel'

export default class CoursesModel extends BaseModel {
	constructor() {
		super(
			'courses',
			{
				name: String,
				description: String,
				_teacherId: { ref: 'users', type: Schema.Types.ObjectId }
			},
			{ timestamps: true },
			[{ name: -1 }]
		)
	}

	static teacherInfoAggregation() {
		return [
			{
				$lookup: {
					from: 'users',
					localField: '_teacherId',
					foreignField: '_id',
					as: 'teacher'
				}
			},
			{ $unwind: { path: '$teacher', preserveNullAndEmptyArrays: true } },
			{
				$project: {
					__v: 0,
					createdAt: 0,
					updatedAt: 0,
					teacher: {
						_id: 0,
						login: 0,
						password: 0,
						type: 0,
						createdAt: 0,
						updatedAt: 0,
						__v: 0
					}
				}
			}
		]
	}
}
