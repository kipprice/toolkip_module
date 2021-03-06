export interface ISimpleModel {
    name: string;
    age: number;
    isReady?: boolean;
}

export interface IIdentifiableModel {
    id: string;
    name: string;
}

export interface IComplexModel {
    activeRecord: ISimpleModel;
    allRecords: ISimpleModel[];
    identifiableRecords: IIdentifiableModel[];
    basicDate: Date;
    transformedDate: Date | string;
}

export interface ICollections { 
    users: IIdentifiableModel[], 
    teamMembers: string[]
}