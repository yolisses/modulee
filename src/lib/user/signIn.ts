import type { UserData } from './UserData';
import { UserModel } from './UserModel';
import { verifyGoogleCredential } from './verifyGoogleCredential';

export async function signIn(credential: string) {
	const payload = await verifyGoogleCredential(credential);
	const { name, email } = payload;
	if (!email) {
		throw new Error('Missing email');
	}
	if (!name) {
		throw new Error('Missing name');
	}

	let userData: UserData;

	const existingUser = await UserModel.findOne({ email }).exec();
	if (existingUser) {
		userData = existingUser.toObject();
	} else {
		const newUser = new UserModel({ name, email });
		await newUser.save();
		userData = newUser.toObject();
	}

	return userData;
}
