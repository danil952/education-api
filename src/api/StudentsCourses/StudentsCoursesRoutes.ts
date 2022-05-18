import { Router } from 'express'
import AuthController from '../Authorization/AuthController'
import StudentsCoursesController from './studentsCoursesController'

export default class StudentsCoursesRoutes {
	static init(_route: Router) {
		_route.post(
			'/studentsCourses',
			[AuthController.checkJWT],
			StudentsCoursesController.createRecord
		)
		_route.get(
			'/studentsCourses/subscribe',
			[AuthController.checkJWT],
			StudentsCoursesController.getStudentCourses
		)
	}
}
