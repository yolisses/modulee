import { ExternalModuleModel } from '$lib/db/externalModule/ExternalModuleModel';
import { LikeModel } from '$lib/db/externalModule/LikeModel';
import { getSession } from '$lib/user/getSession';
import { type RequestHandler, json } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const POST: RequestHandler = async ({ locals, params }) => {
	const { userId } = getSession(locals);
	const { externalModuleId } = params;

	if (!userId) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	if (!externalModuleId) {
		return json({ error: 'Missing externalModuleId' }, { status: 400 });
	}

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const userObjectId = new mongoose.Types.ObjectId(userId);
		const externalModuleObjectId = new mongoose.Types.ObjectId(externalModuleId);

		// Check if already liked
		const existing = await LikeModel.findOne({
			userId: userObjectId,
			externalModuleId: externalModuleObjectId,
		}).session(session);
		if (existing) {
			await session.abortTransaction();
			session.endSession();
			return json({ error: 'Already liked' }, { status: 409 });
		}

		// Create like
		await LikeModel.create([{ userId: userObjectId, externalModuleId: externalModuleObjectId }], {
			session,
		});

		// Increment likeCount on module
		await ExternalModuleModel.updateOne(
			{ _id: externalModuleObjectId },
			{ $inc: { likeCount: 1 } },
			{ session },
		);

		await session.commitTransaction();
		session.endSession();

		return json({ success: true });
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		throw err;
	}
};
