import { Router } from 'express'
import AuthController from '../Authorization/AuthController'
import CoursesController from './CoursesController'

export default class CoursesRoutes {
	static init(_route: Router) {
		_route.get('/courses', CoursesController.getCourses)
		_route.post(
			'/courses',
			[AuthController.checkJWT, AuthController.middlewareAdmin],
			CoursesController.createCourse
		)
		_route.patch(
			'/courses/:_id',
			[AuthController.checkJWT, AuthController.middlewareAdmin],
			CoursesController.updateCourse
		)
		_route.delete(
			'/courses/:_id',
			[AuthController.checkJWT, AuthController.middlewareAdmin],
			CoursesController.deleteCourse
		)
	}
}
