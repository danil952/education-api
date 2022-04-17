import { Request, Response } from 'express'
import { JSObject } from '../../helpers/HelpersInterfaces'
import BaseController from '../../system/base/BaseController'
import BaseRestInterface from '../../system/base/BaseRestInterface'
import ScoresService from './ScoresService'

export default class ScoresController extends BaseController {
	static async acceptAnswer(req: JSObject, res: Response) {
		const data: JSObject = req.body
		const userId: string = req.jwt.id
		try {
			const result = await ScoresService.createNewScore(data, userId)
			res.status(201).send(new BaseRestInterface(201, 'success', result).formatSuccess())
		} catch (e) {
			BaseController.resStatus(e, res)
		}
	}
}
