type GroupNodeExtrasData = { targetGroupId: string };
type ConstantNodeExtrasData = { value: number };

export type ExtrasData = GroupNodeExtrasData | ConstantNodeExtrasData | Record<string, number>;
