import Schema from 'mongoose'
import BaseModel from '../../system/base/BaseModel'

export default class LessonsModel extends BaseModel {
	constructor() {
		super(
			'lessons',
			{
				_courseId: { ref: 'courses', type: Schema.Types.ObjectId },
				indexNumber: { type: Number, required: true },
				name: String,
				lecture: String,
				keys: [String]
			},
			{ timestamps: true },
			[{ indexNumber: -1 }]
		)
	}

	static marksInfoAggregation() {
		return [
			{ $unwind: { path: '$courseData', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'scores',
					localField: '_id',
					foreignField: '_lessonId',
					as: 'marksData'
				}
			},
			{ $unwind: { path: '$marksData', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'users',
					localField: 'marksData._studentId',
					foreignField: '_id',
					as: 'marksData.studentData'
				}
			},
			{ $unwind: { path: '$marksData.studentData', preserveNullAndEmptyArrays: true } },
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
				$group: {
					_id: '$_id',
					courseData: { $first: '$courseData' },
					name: { $first: '$name' },
					indexNumber: { $first: '$indexNumber' },
					marksData: { $push: '$marksData' }
				}
			},
			{ $sort: { indexNumber: 1 } },
			{
				$project: {
					__v: 0,
					createdAt: 0,
					updatedAt: 0,
					lecture: 0,
					practise: 0,
					keys: 0,
					_courseId: 0,
					'marksData.studentData.login': 0,
					'marksData.studentData.password': 0,
					'marksData.studentData.type': 0,
					'marksData.studentData._id': 0,
					'marksData._studentId': 0,
					'marksData._lessonId': 0,
					'marksData._id': 0
				}
			}
		]
	}
}
