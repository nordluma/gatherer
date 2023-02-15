import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect() {
	const dbURI = config.get<string>('dbURI');

	try {
		await mongoose.connect(dbURI);
		mongoose.set('strictQuery', false);
		logger.info('Connected to DB');
	} catch (err) {
		logger.error('Could not connect to DB');
		process.exit(1);
	}
}

export default connect;
