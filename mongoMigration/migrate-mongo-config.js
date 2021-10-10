require('dotenv').config({ path: '../.env.dev' })

const config = {
	mongodb: {
		url: `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
		databaseName: process.env.DATABASE_NAME,
		options: {
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},

	migrationsDir: 'migrations',
	changelogCollectionName: 'changelog',
	migrationFileExtension: '.js',
	useFileHash: false,
}

module.exports = config
