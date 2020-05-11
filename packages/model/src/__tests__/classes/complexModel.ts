import { ISimpleModel, SimpleModel } from "./simpleModel";
import { Model } from "../..";
import { IModelTransforms } from "../../_interfaces";
import { shortDate } from "@toolkip/primitive-helpers";

export interface IComplexModel {
    nestedObject: ISimpleModel;
    nestedArray: ISimpleModel[];
    nestedModel: SimpleModel;
    date: Date;
    anotherDate: Date;
}

export class ComplexModel extends Model<IComplexModel> {
    
    /** easier getters and setters for the date */
    public get date(): Date { return this._getValue("date"); }
    public set date(data: Date) { this._setValue( "date", data ); }
    
    /** getter / setter for the nested object */
    public get nestedObject(): ISimpleModel { return this._getValue("nestedObject"); }
    public set nestedObject(data: ISimpleModel) { this._setValue( "nestedObject", data ); }
    
    /** getter / setter for the nested model */
    public get nestedModel(): SimpleModel { return this._getValue("nestedModel"); }
    public set nestedModel(data: SimpleModel) { this._setValue( "nestedModel", data ); }

    //..........................................
    //#region TRANSFORMS
    
    protected get _transforms(): IModelTransforms<IComplexModel> { 
        return {
            date: {
                incoming: (date: any) => new Date(date.toString()),
                outgoing: (date: Date) => shortDate(date) as any 
            }
        }
    }
    
    //#endregion
    //..........................................

    
}
