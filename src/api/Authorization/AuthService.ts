import HttpErrors from '../../helpers/ErrorsHTTP'
import { JSObject } from '../../helpers/HelpersInterfaces'
import BaseService from '../../system/base/BaseService'
import UsersModel from '../Users/UsersModel'
import UsersTypesModel from '../UsersTypes/UsersTypesModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import config from './AuthConfig'

export default class AuthService {
	public static UsersServiceModel = new BaseService(new UsersModel())
	public static UserTypesServiceModel = new BaseService(new UsersTypesModel())

	static async checkDuplicateLogin(data: JSObject) {
		const user = await AuthService.UsersServiceModel.findOne({
			$match: { login: data.login }
		})
		if (user) throw new HttpErrors('Login already in use', HttpErrors.types.BadRequest)
	}

	static verifyToken(req: JSObject) {
		if (!req.headers.authorization)
			throw new HttpErrors('Error authorization', HttpErrors.types.BadRequest)
		const authorization = req.headers.authorization.split(' ')

		req.jwt = jwt.verify(authorization[1], config.secret) as JSObject
		const refreshTime = Math.ceil(
			Math.abs(new Date().getTime() - new Date(+req.jwt.iat * 1000).getTime()) / 1000
		)
		if (refreshTime > Number(process.env.JWT_TOKEN_SECRET_LIFETIME_IN_MILLISECONDS)) {
			throw new HttpErrors('Expired token', HttpErrors.types.BadRequest)
		}
		return req.jwt.data
	}

	static async signToken(data: JSObject) {
		const user = await AuthService.UsersServiceModel.findOne({
			login: data.login
		})
		if (!user) throw new HttpErrors('No user with such login', HttpErrors.types.BadRequest)

		const passwordIsValid = bcrypt.compareSync(data.password, user.password)
		if (!passwordIsValid) throw new HttpErrors('Password is invalid', HttpErrors.types.BadRequest)

		const token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: 86400 // 24 hours
		})

		const userData = {
			token,
			fio: user.fio,
			login: user.login
		}

		return userData
	}

	static async checkUserType(req: JSObject, type: string) {
		const userId = req.jwt.id
		const user = await AuthService.UsersServiceModel.findById(userId)
		if (!user) throw new HttpErrors('No such user', HttpErrors.types.BadRequest)
		const userType = await AuthService.UserTypesServiceModel.findById(user.type)
		if (userType.type !== type)
			throw new HttpErrors('Permission denied', HttpErrors.types.Forbidden)
	}
}
