import mongoose, { Schema } from 'mongoose';
import { UserDocument } from './user.model';

export interface SchemaDocument extends mongoose.Document {
	user: UserDocument['_id'];
	valid: boolean;
	userAgent: String;
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema: Schema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		valid: { type: Boolean, required: true },
		userAgent: { type: String },
	},
	{
		timestamps: true,
	}
);

const SessionModel = mongoose.model('Session', sessionSchema);
export default SessionModel;
