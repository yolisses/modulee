import { UserModel } from '../UserModel';

export async function getIsUsernameAvailableFromMongoose(username: string) {
	const count = await UserModel.where({ username }).countDocuments();
	return count === 0;
}
