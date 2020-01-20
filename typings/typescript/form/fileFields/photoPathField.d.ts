import { IPhotoPathElemTemplate } from "./_interfaces";
import { FilePathField } from "./filePathField";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
/**----------------------------------------------------------------------------
* @class PhotoPathField
* ----------------------------------------------------------------------------
* create an element to upload photos
* @author  Kip Price
* @version 1.0.0
* ----------------------------------------------------------------------------
*/
export declare class PhotoPathField<T extends IPhotoPathElemTemplate = IPhotoPathElemTemplate> extends FilePathField<T> {
    /** style the elements for this form element */
    protected static _uncoloredStyles: IStandardStyles;
    /** default class for this element */
    protected get _defaultCls(): string;
    /** keep track of the elements needed for this element */
    protected _elems: {
        base: HTMLElement;
        photoWrapper: HTMLElement;
        display: HTMLImageElement;
        overlay: HTMLElement;
        linkBtn: HTMLElement;
        uploadBtn: HTMLElement;
        input: HTMLInputElement;
        error: HTMLElement;
    };
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Handle creating elements for the form element
     */
    protected _onCreateElements(): void;
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Handle cloning this element
     * @param   appendToID  If provided, the ID to append to this element
     * @returns The created cloned element
     */
    protected _createClonedElement(appendToID: string): PhotoPathField<T>;
    /**
     * update
     * ----------------------------------------------------------------------------
     * Update the data within this form
     * @param   data    The details to update this element with
     */
    update(data: string, allowEvents: boolean): void;
    /**
     * _onFileSelected
     * ----------------------------------------------------------------------------
     * handle when a file is selected
     */
    protected _onFileSelected(): void;
    /**
     * _onLinkChange
     * ----------------------------------------------------------------------------
     * manage when the details of this photo change
     * @returns True if the link was changed appropriately
     */
    protected _onLinkChange(): string;
    /**
     * _onClear
     * ----------------------------------------------------------------------------
     * handle clearing details within the file selector
     */
    clear(): void;
    /**
     * save
     * ----------------------------------------------------------------------------
     * @param   internalOnly    If true, we're only saving to our own data field,
     *                          not an external callers
     *
     * @returns The file path that is now saved
     */
    save(internalOnly?: boolean): Promise<string>;
    protected _readFile(file: File, defer?: boolean): Promise<string | ArrayBuffer>;
    protected _loadImage(dataUrl: string): Promise<HTMLImageElement>;
    /**
     * _renderOnCanvas
     * ----------------------------------------------------------------------------
     * generate the files on canvas, in order to resize them
     */
    protected _renderOnCanvas(img: HTMLImageElement): Promise<Blob>;
    /**
     * _resizeImages
     * ----------------------------------------------------------------------------
     * resize all images included in this image upload
     */
    protected _resizeImages(files: FileList): Promise<Blob[]>;
    protected _resizeImage(file: File, outFiles: Blob[]): Promise<Blob>;
}
