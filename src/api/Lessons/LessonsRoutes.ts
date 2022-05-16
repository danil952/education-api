import { Router } from 'express'
import AuthController from '../Authorization/AuthController'
import LessonsController from './LessonsController'

export default class LessonsRoutes {
	static init(_route: Router) {
		_route.post(
			'/lessons',
			[AuthController.checkJWT, AuthController.middlewareProfessor],
			LessonsController.createLesson
		)
		_route.get('/lessons/course/:_id', LessonsController.getLessonsCourse)
	}
}
