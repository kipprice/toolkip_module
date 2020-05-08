import { IDictionary } from "@toolkip/object-helpers";

export interface ISimpleModel {
    name: string;
    count: number;
}

export interface IComplexModel {
    childArray: ISimpleModel[];
    coreChild: ISimpleModel;
    childDict: IDictionary<ISimpleModel>
}