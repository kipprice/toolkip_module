import { IFormFileElemTemplate } from "./_interfaces";
import { Field } from "../_field";
import { FieldTypeEnum } from "../_interfaces";
import { IAttributes } from "../../htmlHelpers/_interfaces";
/**----------------------------------------------------------------------------
 * @class FileUploadField
 * ----------------------------------------------------------------------------
 * handle file uploads such that they return a file list
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class FileUploadField<T extends IFormFileElemTemplate<FileList> = IFormFileElemTemplate<FileList>> extends Field<FileList, T> {
    /** track the type of form element this is */
    protected get _type(): FieldTypeEnum;
    /** give this for element a default CSS class */
    protected get _defaultCls(): string;
    /** set a default value for this form element type */
    protected get _defaultValue(): FileList;
    /** keep track of the  */
    protected _attr: IAttributes;
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Parse the details of how to render this element
     */
    protected _parseFieldTemplate(template: T): void;
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Handle creating elements
     */
    protected _onCreateElements(): void;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * Handle when the user has uploaded a file
     * @returns True if the file passes validation
     */
    protected _getValueFromField(): FileList;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Handle cloning this element
     * @param   appendToId  The ID to append to the cloned element
     * @returns The created cloned element
     */
    protected _createClonedElement(appendToId: string): FileUploadField<T>;
}
