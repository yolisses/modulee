import { Node } from '../Node.svelte';
import { devNodesData } from './devNodesData';

export const devNodes = devNodesData.map((nodeData) => new Node(nodeData));

devNodes[2].connectors[0].assignConnectedTo(devNodes[1].connectors[0]);
