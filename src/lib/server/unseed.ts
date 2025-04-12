import { ExternalModuleModel } from '$lib/db/externalModule/ExternalModuleModel';
import { UserModel } from '$lib/user/UserModel';

export async function unseed() {
	await Promise.all([
		UserModel.deleteMany({ isSeeded: true }),
		ExternalModuleModel.deleteMany({ isSeeded: true }),
	]);
}
