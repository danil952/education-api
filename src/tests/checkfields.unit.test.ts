import HelperClass from '../helpers/HelperClass'
import assert from 'assert'

describe('helper class tests', () => {
	it('check required Field', () => {
		assert.strictEqual(
			HelperClass.checkRequiredField('name', { name: 'test_name' }, 'string'),
			undefined
		)
	})
	it('pagination page', () => {
		assert.deepStrictEqual(HelperClass.pagination({ size: 5, skip: 1, page: 2 }), {
			size: 5,
			skip: 5,
			page: 1
		})
	})

	it('without required field', async () => {
		try {
			await HelperClass.checkRequiredField('age', { name: 1 }, 'string')
			assert.fail('expected exception not thrown')
		} catch (e) {
			assert.strictEqual(e.message, 'age is required')
		}
	})

	it('error type', async () => {
		try {
			await HelperClass.checkRequiredField('name', { name: 1 }, 'string')
			assert.fail('expected exception not thrown')
		} catch (e) {
			assert.strictEqual(e.message, 'wrong type of name')
		}
	})
})
