import { Router } from 'express'
import UsersController from './UsersController'
import AuthController from '../Authorization/AuthController'

export default class UsersRoutes {
	static init(_route: Router) {
		_route.post('/users', UsersController.createUser)
		_route.post(
			'/users/professor',
			[AuthController.checkJWT, AuthController.middlewareAdmin],
			UsersController.createProfessor
		)
		_route.patch('/users/:_id', [AuthController.checkJWT], UsersController.updateUser)
		_route.get('/users/professors', UsersController.getProfessors)
		_route.delete(
			'/users/:_id',
			[AuthController.checkJWT, AuthController.middlewareAdmin],
			UsersController.deleteUser
		)
	}
}
