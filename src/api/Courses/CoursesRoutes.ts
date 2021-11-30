import { Router } from 'express'
import AuthController from '../Authorization/AuthController'
import CoursesController from './CoursesController'

export default class CoursesRoutes {
	static init(_route: Router) {
		_route.post(
			'/courses',
			[AuthController.checkJWT, AuthController.middlewareAdmin],
			CoursesController.createCourse
		)
		_route.get('/courses', CoursesController.getCourses)
	}
}
