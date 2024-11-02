//
type Json =
	| boolean
	| number
	| string
	| null
	| { [key: string]: Json }
	| Array<Json>;

export type User = {
	uuid: UUIDTypes;
	fname?: string;
	name: string;
	mail: string;
	phone?: string;
	roles?: UUIDTypes[];
};

export type Role = {
	uuid: UUIDTypes;
	name: string;
	rights?: UUIDTypes[];
};

export type Right = {
	uuid: UUIDTypes;
	name: string;
};
