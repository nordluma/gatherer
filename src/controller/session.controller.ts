import { Request, Response } from 'express';
import config from 'config';
import { createSession, findSessions } from '../service/session.service';
import { valdiatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
	// Validate users password
	const user = await valdiatePassword(req.body);
	if (!user) {
		return res.status(401).send('Invalid email or password');
	}

	// Create session
	const session = await createSession(user._id, req.get('user-agent') || '');

	// Create access token
	const accessToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: config.get<string>('accessTokenTtl') } // 15 minutes
	);

	// Create a refresh token
	const refreshToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: config.get<string>('refreshTokenTtl') } // 15 minutes
	);

	// Return access and refresh token
	return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
	const userId = res.locals.user._id;
	const sessions = await findSessions({ user: userId, valid: false });
	return res.send(sessions);
}
