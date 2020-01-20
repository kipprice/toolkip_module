import { FieldTypeEnum, IFields, ICanSaveTracker } from "../_interfaces";
import { CollapsibleField } from "./_collapsibleField";
import { Field } from "../_field";
import { ArrayChildField } from "./arrayChildField";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { IFormArrayTemplate, DirectionType } from "./_interfaces";
/**----------------------------------------------------------------------------
 * @class ArrayField
 * ----------------------------------------------------------------------------
 * Create an element in the form that can be added to
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class ArrayField<M, T extends IFormArrayTemplate<M> = IFormArrayTemplate<M>> extends CollapsibleField<M[], T> {
    protected get _type(): FieldTypeEnum;
    protected get _defaultValue(): M[];
    protected get _defaultCls(): string;
    protected _data: M[];
    protected _childTemplate: IFields<M> | Field<M>;
    get childTemplate(): IFields<M> | Field<M>;
    protected _children: Field<M>[];
    /** elements contained within the array element */
    protected _elems: {
        base: HTMLElement;
        title: HTMLElement;
        collapseElem?: HTMLElement;
        titleContainer?: HTMLElement;
        childrenContainer: HTMLElement;
        newButton: HTMLElement;
    };
    /** what to label the new button */
    protected _newLabel: string;
    /** if true, allows card to be rearranged  */
    protected _allowReordering: boolean;
    protected static _uncoloredStyles: IStandardStyles;
    protected _getUncoloredStyles(): IStandardStyles;
    /**
     * setThemeColor
     * ----------------------------------------------------------------------------
     * update the appropriate theme color for the form
     */
    setThemeColor(uniqueId: string, color: string, noReplace?: boolean): void;
    /**
     * ArrayElement
     * ----------------------------------------------------------------------------
     * Generate a form element that can contain lots of copies
     * @param id        Unique identifier for this array element
     * @param template  Details for the overall array
     * @param children
     */
    constructor(id: string, template: T | ArrayField<M, T>, children?: IFields<M> | Field<M>);
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Parse the details of our own template
     */
    protected _parseFieldTemplate(template: T): void;
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * create the elements for the array
     */
    protected _onCreateElements(): void;
    /**
     * _createNewButton
     * ----------------------------------------------------------------------------
     * Add the button to create a new entry into our array
     */
    protected _createNewButton(): void;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * create a cloned version of this element
     */
    protected _createClonedElement(appendToID: string): ArrayField<M, T>;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * array elements are always validated as true
     */
    protected _getValueFromField(): M[];
    /**
     * update
     * ----------------------------------------------------------------------------
     * handle when an external force needs to update the form
     */
    update(data: M[], allowEvents: boolean): void;
    /**
     * _createNewChild
     * ----------------------------------------------------------------------------
     * create a new child element in the array
     */
    protected _createNewChild(): ArrayChildField<M>;
    /**
     * _generateChildElement
     * ----------------------------------------------------------------------------
     * generate a new child array element
     */
    protected _generateChildElement(): ArrayChildField<M>;
    /**
     * _finalizeNewChild
     * ----------------------------------------------------------------------------
     * add the created child to our style map and our children
     */
    protected _finalizeNewChild(elem: ArrayChildField<M>): void;
    /**
     * _addNewChildListeners
     * ----------------------------------------------------------------------------
     * make sure the child has the appropriate listeners
     */
    protected _addNewChildListeners(child: ArrayChildField<M>): void;
    /**
     * _updateInternalData
     * ----------------------------------------------------------------------------
     * Make sure we are aware of the contents of our children
     */
    protected _updateInternalData(internalOnly?: boolean): Promise<any>;
    protected _updateInternalField(elem: Field<M>, data: M[], internalOnly?: boolean): Promise<any>;
    /**
    * save
    * ----------------------------------------------------------------------------
    * Handle saving the section
    * @param   internalOnly    If true, doesn't do all the updating that would
    *                          happen on a real save
    *
    * @returns The data contained in this sections child elements
    */
    save<K extends keyof M>(internalOnly?: boolean): Promise<M[]>;
    /**
     * canSave
     * ----------------------------------------------------------------------------
     * Determine whether this element can save, based on whether its children
     * have errors.
     *
     * @returns True if we can save this element
     */
    canSave<K extends keyof M>(): ICanSaveTracker;
    /**
     * _onClear
     * ----------------------------------------------------------------------------
     * handle clearing out the array
     */
    clear(): void;
    /**
     * onChangeOrder
     * ----------------------------------------------------------------------------
     * Make sure we respect the new order of these
     */
    onChangeOrder(child: ArrayChildField<M>, direction: DirectionType, moveTo?: number): void;
    /**
     * focus
     * ----------------------------------------------------------------------------
     * Give focus to the first field in our first child element
     */
    focus(): boolean;
    getField(id: string): Field<any>;
}
