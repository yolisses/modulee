import type { CommandData } from 'modulee-nodes-editor';

export interface InstrumentsRepository {
	initialize(): Promise<void>;
	getInstruments(): Promise<InstrumentData[]>;
	getInstrument(id: string): Promise<InstrumentData>;
	addCommand(commandData: CommandData): Promise<void>;
	createInstrument(instrumentData: InstrumentData): Promise<void>;
}
