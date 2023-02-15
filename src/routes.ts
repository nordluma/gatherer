import { Express, Request, Response } from 'express';
import {
	createUserSessionHandler,
	getUserSessionsHandler,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import valditateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
	app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

	app.post(
		'/api/users',
		valditateResource(createUserSchema),
		createUserHandler
	);

	app.post(
		'/api/sessions',
		valditateResource(createSessionSchema),
		createUserSessionHandler
	);

	app.get('/api/sessions', getUserSessionsHandler);
}

export default routes;
