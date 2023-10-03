export type BasicType = {
	id: string;
	name: string;
};

export interface PersonType extends BasicType {
	age: string;
}

export type PersonJsonType = {
	people: PersonType[] | BasicType[];
};
