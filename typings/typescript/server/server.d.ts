/**
 * enum to keep track of the types of AJAX requesr
 * @version 1.0
 *
 */
export declare enum AjaxTypeEnum {
    POST = 1,
    GET = 2
}
/**
 * @interface IAjaxSuccessFunction
 * @version 1.0
 * handle when an ajax request ends in a success
 *
 */
export interface IAjaxSuccessFunction {
    (response: string): void;
}
/**
 * @interface IAjaxErrorFunction
 * @version 1.0
 * handle when an ajax request ends in a failure
 *
 */
export interface IAjaxErrorFunction {
    (response: string): void;
}
/**
 * @interface IAjaxParams
 * @version 1.0
 * keeps track of parameters that will be sent in an AJAX call
 *
 */
export interface IAjaxParams {
    [ajaxKey: string]: string;
}
export interface IAjaxDetails {
    type: AjaxTypeEnum;
    requestUrl: string;
    params: IAjaxParams | FormData;
    headerParams?: IAjaxParams;
}
/**
 * ajaxRequest
 * ----------------------------------------------------------------------------
 * Sends an AJAX request to a url of our choice as either a POST or GET
 *
 * @param   type        Set to either "POST" or "GET" to indicate the type of response we want
 * @param   url         The URL to send the request to
 * @param   success     A function to run if the call succeeds
 * @param   error       A function to run if the request errors out
 * @param   params      An object with key value pairs
 *
 * @returns The request that was sent
*/
export declare function ajaxRequest(type: AjaxTypeEnum, url: string, successCb?: IAjaxSuccessFunction, errorCb?: IAjaxErrorFunction, params?: IAjaxParams | FormData, headerParams?: IAjaxParams): XMLHttpRequest;
/**
 * ajax
 * ----------------------------------------------------------------------------
 * Run an async ajax call to the specified server
 * @param   ajaxDetails     The type of request to run
 * @returns A promise that will return the results of the ajax call
 */
export declare function ajax(ajaxDetails: IAjaxDetails): Promise<any>;
/**
 * loadFile
 * ----------------------------------------------------------------------------
 * load a file from a particular URL
 *
 * @param   url         The URL to load a file from
 * @param   success     What to do when the file is loaded successfully
 * @param   error       What do do if the file can't be loaded
 */
export declare function loadFile(url: string, success?: IAjaxSuccessFunction, error?: IAjaxErrorFunction): void;
export declare function saveFile(fileName: string, content: string | Blob): void;
