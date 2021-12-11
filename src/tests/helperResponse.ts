export const createResponse = () => {
	return {
		_status: null,
		_json: null,
		status(code: any) {
			this._status = code
			return this
		},
		send(json: any) {
			this._json = json
			return this
		}
	}
}
