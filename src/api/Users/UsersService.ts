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

	static async updateUser(data: JSObject, _id: string) {
		const sender = await UsersService.UsersServiceModel.findById(data._userId)
		const senderType = await UsersService.UsersTypesServiceModel.findById(sender.type)
		const user = await UsersService.UsersServiceModel.findById(_id)

		console.log(data)

		if (senderType.type !== 'admin' && user._id !== sender._id)
			throw new HttpErrors('Permission denied', HttpErrors.types.Forbidden)

		if (data.login) {
			const isUserExists = await UsersService.UsersServiceModel.dataExists({
				login: { $regex: data.login, $options: 'i' }
			})
			if (isUserExists)
				throw new HttpErrors('User with such login already exists', HttpErrors.types.Conflict)

			user.login = data.login
		}

		if (data.password) {
			user.password = bcrypt.hashSync(data.password, 8)
		}

		if (data.fio) user.fio = data.fio

		return await UsersService.UsersServiceModel.updateData(_id, user, { new: true })
	}

	static async getProfessorsData() {
		const professorTypeId = await UsersService.UsersTypesServiceModel.getDataByQuery({
			type: 'professor'
		})
		const pipeline = [
			{ $match: { type: professorTypeId[0]._id } },
			{
				$project: {
					__v: 0,
					createdAt: 0,
					updatedAt: 0,
					password: 0,
					type: 0
				}
			}
		]

		return await UsersService.UsersServiceModel.groupBy(pipeline)
	}
}
