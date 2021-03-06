import { map } from '@toolkip/object-helpers';
import { IAjaxParams, IAjaxDetails } from "./_interfaces";

/**
 * ajax
 * ----------------------------------------------------------------------------
 * Run an async ajax call to the specified server
 * @param   ajaxDetails     The type of request to run
 * @returns A promise that will return the results of the ajax call
 */
export function ajax(ajaxDetails: IAjaxDetails): Promise<any> {
    return new Promise((resolve, reject) => {
        _innerAjax(ajaxDetails, resolve, reject);
    });
}

/**
 * ajaxRequest
 * ----------------------------------------------------------------------------
 * Sends an AJAX request to a url of our choice as either a POST or GET
 * 
 * @param   ajaxDetails details about the request being sent
 * @param   resolve     promise resolve
 * @param   reject      promise reject
 * 
 * @returns The request that was sent
*/
function _innerAjax(ajaxDetails: IAjaxDetails, resolve: Function, reject: Function): XMLHttpRequest {

    // try to create the request
    let request = _getXmlRequestObject();
    if (!request) return null;

    // register the appropriate callbacks
    _assignXmlRequestCallbacks(
        request, 
        (...params: any[]) => resolve(...params), 
        (...params: any[]) => reject(...params)
    ); 

    // send the actual request
    _sendXmlRequest(request, ajaxDetails);
    return request;
};

/**
 * _getXmlRequestObject
 * ----------------------------------------------------------------------------
 * create the Xml request object 
 * 
 * @returns A created request, appropriate for the particular browser
 * 
 */
function _getXmlRequestObject(): XMLHttpRequest {
    let request: XMLHttpRequest = null;

    // Non IE
    try { request = new XMLHttpRequest(); }
    catch (e) {

        // try the first IE approach
        try { request = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {

            // try the 2nd IE approach
            try { request = new ActiveXObject("Microsoft.XMLHTTP"); }   
            catch (e) {
                return null;
            }
        }
    }
    return request;
}

/**
 * _assignXmlRequestCallbacks
 * ----------------------------------------------------------------------------
 * handle the xml request getting back to us 
 * 
 * @param   request     The AJAX request, appropriate for the browser
 * @param   successCb   What to do if the request successfully returns
 * @param   errorCb     What to do if the request fails
 * 
 * @returns The request, now configured to handle success + error states
 */
function _assignXmlRequestCallbacks(request: XMLHttpRequest, successCb: Function, errorCb: Function): XMLHttpRequest {
    request.onreadystatechange = () => {

        // wait til the response is ready
        if (request.readyState !== 4) { return }
            
        // success: any 2xx code
        if (_isValidResponse(request.status)) {
            successCb(request.responseText);

        // failure: anything but a 2XX code
        } else {
            errorCb(request.responseText);
        }

    };
    return request;
}

/**
 * _addHeaderData
 * ----------------------------------------------------------------------------
 * send all details that belong in the header through the header
 */
function _addHeaderData(request: XMLHttpRequest, headerParams: IAjaxParams): void {
    if (!headerParams) { return; }
    map(headerParams, (value, key) => {
        request.setRequestHeader(key as string, value)
    });
}

/**
 * _sendXmlRequest
 * ----------------------------------------------------------------------------
 * handle the actual sending of the request 
 * 
 * @param   request     The AJAX request to send
 * @param   type        Whether this is a POST or a GET request
 * @param   url         Where to send the request
 * @param   params      What parameters or data should be sent with the request
 * 
 * @returns The sent request
 * 
 */
function _sendXmlRequest(request: XMLHttpRequest, { type, requestUrl, params, headerParams}: IAjaxDetails): XMLHttpRequest {

    request.open(type, requestUrl, true);
    _addHeaderData(request, headerParams);

    let urlParams = null;
    if (type === "POST") {
        urlParams = _setRequestHeader(request, params);
    }

    request.send(urlParams);
    return request;
}

/**
 * _setRequestHeader
 * ----------------------------------------------------------------------------
 * handle sending POST AJAX queries 
 * 
 * @param   request     The request to send
 * @param   url         The URL to which to send the request
 * @param   params      The parameters or data to send with the request
 * 
 * @returns The sent request
 * 
 */
function _setRequestHeader(request: XMLHttpRequest, params?: IAjaxParams | FormData): string | FormData{
    let reqHeaderType: string;
    let outParams: string | FormData;

    if (params instanceof FormData) {
        reqHeaderType = "multipart/form-data";
        outParams = params;
    } else {
        reqHeaderType = "application/json";
        outParams = JSON.stringify(params);
    }

    if (reqHeaderType) { request.setRequestHeader("Content-Type", reqHeaderType); }

    return outParams;
}

/**
 * _buildParameters
 * ----------------------------------------------------------------------------
 * turn a param object into a string suitable for a URI 
 * 
 * @param   params      List of parameters that we will turn into an appropriate AJAX request string
 * 
 * @returns The string containing all appropriate paramters
 * 
 */
function _buildParameters(params: IAjaxParams): string {
    let paramOut: string[] = [];

    map(params, (val: any, key: string) => {

        // Make sure we add the key-value pair, properly escaped
        let urlParam = encodeURIComponent(key) + "=" + encodeURIComponent(val);
        paramOut.push(urlParam);
    })

    return paramOut.join("&");
}

/**
 * _isValidResponse
 * ----------------------------------------------------------------------------
 * verify that the response counts as a valid one
 */
function _isValidResponse(responseCode: number): boolean {
    if (responseCode < 200) { return false; }
    if (responseCode >= 300) { return false; }
    return true;
}