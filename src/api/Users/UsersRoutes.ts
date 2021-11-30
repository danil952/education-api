import { Router } from 'express'
import UsersController from './UsersController'

export default class UsersRoutes {
	static init(_route: Router) {
		_route.post('/users', UsersController.createUser)
	}
}
