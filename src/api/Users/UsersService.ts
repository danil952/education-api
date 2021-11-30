import BaseService from '../../system/base/BaseService'
import UsersTypesModel from '../UsersTypes/UsersTypesModel'
import UsersModel from './UsersModel'
import HelperClass from '../../helpers/HelperClass'
import HttpErrors from '../../helpers/ErrorsHTTP'
import { JSObject } from '../../helpers/HelpersInterfaces'
import bcrypt from 'bcryptjs'

export default class UsersService {
	private static UsersServiceModel = new BaseService(new UsersModel())
	private static UsersTypesServiceModel = new BaseService(new UsersTypesModel())

	static async createNewUser(data: JSObject, type: String) {
		HelperClass.checkRequiredField('login', data, 'string')
		HelperClass.checkRequiredField('password', data, 'string')
		HelperClass.checkRequiredField('fio', data, 'string')

		const isUserExists = await UsersService.UsersServiceModel.dataExists({
			login: { $regex: data.login, $options: 'i' }
		})
		if (isUserExists)
			throw new HttpErrors('User with such login already exists', HttpErrors.types.Conflict)

		const userType = await UsersService.UsersTypesServiceModel.findOne({
			type
		})
		if (!userType) throw new HttpErrors('No such user type', HttpErrors.types.Conflict)

		data.type = userType._id
		data.password = bcrypt.hashSync(data.password, 8)

		return await UsersService.UsersServiceModel.insertData(data)
	}
}
