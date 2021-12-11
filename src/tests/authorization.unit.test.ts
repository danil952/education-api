import assert from 'assert'
import sinon from 'sinon'
import { Request } from 'express'
import mongoose from 'mongoose'
import { createResponse } from './helperResponse'
import AuthController from '../api/Authorization/AuthController'

let res = createResponse() as any
let req = sinon.mock(Request) as any

describe('authorization tests', () => {
	before(() => {
		return mongoose.connect(
			`mongodb://${process.env.DATABASE_HOST || 'localhost'}:${Number(process.env.DATABASE_PORT) ||
				27017}`,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
				user: process.env.DATABASE_USER || '',
				pass: process.env.DATABASE_PASSWORD || '',
				dbName: process.env.DATABASE_NAME || ''
			}
		)
	})

	beforeEach(() => {
		req = sinon.mock(Request) as any
		res = createResponse() as any
	})

	it('check auth', async () => {
		req.body = { ...req.body, login: 'something wrong data', password: 'something wrong data' }
		await AuthController.login(req, res)
		assert.strictEqual(res._status, 400)
	})

	after(async () => {
		await mongoose.disconnect()
	})
})
