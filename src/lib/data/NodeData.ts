import type { ConstantNodeData } from './variants/ConstantNodeData';
import type { GroupNodeData } from './variants/GroupNodeData';
import type { GroupVoicesNodeData } from './variants/GroupVoicesNodeData';
import type { InputNodeData } from './variants/InputNodeData';

export type NodeData = InputNodeData | GroupNodeData | ConstantNodeData | GroupVoicesNodeData;
