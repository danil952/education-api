const envFileName = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.' + process.env.NODE_ENV
require('dotenv').config({ path: envFileName })
