import Schema from 'mongoose'
import BaseModel from '../../system/base/BaseModel'

export default class ScoresModel extends BaseModel {
	constructor() {
		super(
			'scores',
			{
				mark: { type: Number, required: true },
				_studentId: { ref: 'users', type: Schema.Types.ObjectId },
				_lessonId: { ref: 'lessons', type: Schema.Types.ObjectId }
			},
			{ timestamps: true },
			[{ name: -1 }]
		)
	}
}
