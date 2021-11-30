import { Router } from 'express'
import UsersRoutes from './Users/UsersRoutes'
import UsersTypesRoutes from './UsersTypes/UsersTypesRoutes'
import AuthRoutes from './Authorization/AuthRoutes'
import CoursesRoutes from './Courses/CoursesRoutes'

export class Routes {
	public _route: Router
	constructor() {
		this._route = Router()
		this.initRoutes()
	}
	initRoutes() {
		UsersRoutes.init(this._route)
		UsersTypesRoutes.init(this._route)
		AuthRoutes.init(this._route)
		CoursesRoutes.init(this._route)
		return this._route
	}
}
