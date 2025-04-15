import type { Has_Id } from '$lib/db/externalModule/Has_Id';
import type { HasIsSeeded } from '$lib/db/externalModule/HasIsSeeded';
import type { UserData } from './UserData';

export type UserDocument = UserData & Has_Id & HasIsSeeded;
