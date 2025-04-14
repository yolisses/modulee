import type { PipelineStage } from 'mongoose';

/**
 * Populate user data following the data minimization principle
 */
export function getBasicUserDataStages(): PipelineStage[] {
	return [
		{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userFullData' } },
		{ $unwind: { path: '$userFullData', preserveNullAndEmptyArrays: true } },
		{ $addFields: { user: { _id: '$userFullData._id', username: '$userFullData.username' } } },
		{ $project: { userFullData: 0 } },
	];
}
