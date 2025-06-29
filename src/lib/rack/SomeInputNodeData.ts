import type { AudioInputNodeData } from '$lib/node/data/variants/AudioInputNodeData';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';

export type SomeInputNodeData = InputNodeData | AudioInputNodeData;
