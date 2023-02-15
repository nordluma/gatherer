import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
	body: object({
		username: string({
			required_error: 'Username is required',
		}),
		password: string({
			required_error: 'Password is required',
		}).min(6, 'Password too short - Minimum length: 6'),
		passwordConfirmation: string({
			required_error: 'PasswordConfirmation is required',
		}),
		email: string({
			required_error: 'Email is required',
		}).email('Not a valid email'),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: 'Password do not match',
		path: ['passwordConfirmation'],
	}),
});

export type CreateUserInput = Omit<
	TypeOf<typeof createUserSchema>,
	'body.passwordConfirmation'
>;
