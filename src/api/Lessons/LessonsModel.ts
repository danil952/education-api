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
				practise: [String],
				keys: [String]
			},
			{ timestamps: true },
			[{ indexNumber: -1 }]
		)
	}
}
