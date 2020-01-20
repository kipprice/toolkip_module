import { FieldTypeEnum, IFields } from "../_interfaces";
import { Field } from "../_field";
import { SectionField } from "./sectionField";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { IArrayChildTemplate, IArrayChildHTMLElements, DirectionType, IArrayField } from "./_interfaces";
/**----------------------------------------------------------------------------
 * @class   ArrayChildField
 * ----------------------------------------------------------------------------
 * Keep track of a child of an array in the form
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class ArrayChildField<M, T extends IArrayChildTemplate<M> = IArrayChildTemplate<M>> extends SectionField<M, T> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): M;
    protected get _defaultCls(): string;
    protected _config: T;
    protected _orderlistener: IArrayField<M>;
    protected _elems: IArrayChildHTMLElements;
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    /** create an element of an array */
    constructor(id: string, children: IFields<M> | Field<M>, template?: T);
    protected _onCreateElements(): void;
    protected _createClonedElement(appendToID: string): ArrayChildField<M, T>;
    protected _cloneFormElement(child: Field<any>): Field<any>;
    protected _delete(): void;
    /**
     * _updateInternalData
     * ----------------------------------------------------------------------------
     * handle updating parent elements with the details of this child
     */
    protected _updateInternalData(internalOnly?: boolean): Promise<any>;
    addOrderingListener(orderListener: IArrayField<M>): void;
    protected _changeOrder(direction: DirectionType): void;
}
