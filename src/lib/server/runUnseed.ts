import { config } from 'dotenv';
import { connect, disconnect } from 'mongoose';
import { unseed } from './unseed';

// TODO find a more secure way to run seed.ts as a server only file.
//
// This is a bypass to SvelteKit env variables protection.
config();

// Just to make TypeScript happy
declare const process: {
	env: Record<string, string>;
};
await connect(process.env.MONGO_DB_URL);
await unseed();
await disconnect();
