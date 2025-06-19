import type { AudioInputNodeData } from '$lib/data/variants/AudioInputNodeData';
import type { InputNodeData } from '$lib/data/variants/InputNodeData';

export type SomeInputNodeData = InputNodeData | AudioInputNodeData;
