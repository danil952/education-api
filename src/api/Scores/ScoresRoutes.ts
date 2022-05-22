import { Router } from 'express'
import AuthController from '../Authorization/AuthController'
import ScoresController from './ScoresController'

export default class ScoresRoutes {
	static init(_route: Router) {
		_route.post('/scores/', [AuthController.checkJWT], ScoresController.acceptAnswer)
		_route.get('/scores/', [AuthController.checkJWT], ScoresController.getUserScores)
	}
}
