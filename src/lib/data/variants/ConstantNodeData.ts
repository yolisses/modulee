import type { NodeDataBase } from '../NodeDataBase';
import type { ConstantNodeExtrasData } from './ConstantNodeExtrasData';

export type ConstantNodeData = NodeDataBase<
	'ConstantNode',
	ConstantNodeExtrasData,
	Record<never, number>
>;
