export default class HttpErrors {
	static types = {
		NotFound: 404,
		BadRequest: 400,
		Forbidden: 403,
		Conflict: 409,
		BadGateway: 502
	}
	message: string
	code: number

	constructor(message: string, code: number) {
		this.message = message
		this.code = code
	}
}
