import { model } from 'mongoose';
import { LikeSchema } from './LikeSchema';

export const LikeModel = model('Like', LikeSchema);
