import express, { Express, Request, Response } from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';

//import { deckRoutes } from './routes/deck';

const port = config.get<number>('port');

const app: Express = express();

app.use(express.json);

app.get('/', (req: Request, res: Response) => {
	res.send('Express + Typescript Server');
});

app.listen(port, async () => {
	logger.info(`⚡️[server]: App is running at http://localhost:${port}`);
	await connect();
	routes(app);
});
