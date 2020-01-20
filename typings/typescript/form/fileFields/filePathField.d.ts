import { IStandardStyles } from './../../styleHelpers/_interfaces';
import { Field } from "../_field";
import { IAttributes } from "../../htmlHelpers/_interfaces";
import { IFormFilePathElemTemplate, IFileSaveCallback } from './_interfaces';
import { FieldTypeEnum } from '../_interfaces';
/**----------------------------------------------------------------------------
 * @class FilePathField
 * ----------------------------------------------------------------------------
 * handle a file-upload field that supports just a file path
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
export declare class FilePathField<T extends IFormFilePathElemTemplate = IFormFilePathElemTemplate> extends Field<string, T> {
    /** style elements for the file path */
    protected static _uncoloredStyles: IStandardStyles;
    /** select the appropriate type for the file path type */
    protected get _type(): FieldTypeEnum;
    /** set a default class for file-path elements */
    protected get _defaultCls(): string;
    /** set a default value for file-path elements */
    protected get _defaultValue(): string;
    /** allow the caller to specify how the image gets saved to the server (and the filepath that ultimately gets saved) */
    protected _onSaveCallback: IFileSaveCallback;
    /** track the files that have been uploaded */
    protected _files: FileList;
    /** ??? */
    protected _attr: IAttributes;
    /** determine if the link was the element that changed */
    protected _tempLink: string;
    protected _elems: {
        base: HTMLElement;
        input: HTMLInputElement;
        inputLabel?: HTMLElement;
        inputContainer?: HTMLElement;
        label?: HTMLElement;
        error: HTMLElement;
        display: HTMLElement;
    };
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Handle creating this element off of a template
     * @param   template
     */
    protected _parseFieldTemplate(template: T): void;
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     */
    protected _onCreateElements(): void;
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * handle when the data in this element changes
     */
    protected _getValueFromField(): string;
    /**
     * _onLinkChange
     * ----------------------------------------------------------------------------
     */
    protected _onLinkChange(): string;
    /**
     * update
     * ----------------------------------------------------------------------------
     * update this element to have the appropriate data
     */
    update(data: string, allowEvents: boolean): void;
    /**
     * save
     * ----------------------------------------------------------------------------
     * @param   internalOnly    If true, we're only saving to our own data field,
     *                          not an external callers
     *
     * @returns The file path that is now saved
     */
    save(internalOnly?: boolean): Promise<string>;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Duplicate this form element appropriately
     */
    protected _createClonedElement(appendToID: string): FilePathField<T>;
}
