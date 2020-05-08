import { IFieldConfig } from "../_interfaces";
import { IAttributes } from "@toolkip/create-elements";


export interface IFileSaveCallback {
    (files: FileList, blobs?: Blob[]): Promise<string>;
}

export interface IFormFilePathElemTemplate extends IFormFileElemTemplate<string> {
    onSave: IFileSaveCallback;
}

export interface IFormFileElemTemplate<T> extends IFieldConfig<T> {
    attr?: IAttributes;
}

export interface IPhotoPathElemTemplate extends IFormFilePathElemTemplate {
    maxSize?: number;
}