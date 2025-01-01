import { Node } from '../Node.svelte';
import { devNodesData } from './devNodesData';

export const devNodes = devNodesData.map((nodeData) => new Node(nodeData));

devNodes[2].inputs[0].assignConnectedTo(devNodes[1].inputs[0]);
devNodes[2].inputs[1].assignConnectedTo(devNodes[1].inputs[0]);
