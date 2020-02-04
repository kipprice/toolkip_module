/**
 * enum to keep track of the types of AJAX requesr
 */
export type AjaxTypeEnum = "POST" | "GET";

/**
 * keeps track of parameters that will be sent in an AJAX call
 * 
 */
export interface IAjaxParams {
    [ajaxKey: string]: any;
}

/**
 * pass in details about a particular ajax request
 */
export interface IAjaxDetails {
    type: AjaxTypeEnum;
    requestUrl: string;
    params?: IAjaxParams | FormData;
    headerParams?: IAjaxParams;
}

export interface IFileDetails {
    filename: string;
    content?: string | Blob;
}