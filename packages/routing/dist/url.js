"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * cleanURL
 * ----------------------------------------------------------------------------
 * Generate the current URL without any additional parameters
 */
function cleanURL() {
    return window.location.href.replace(window.location.search, "");
}
exports.cleanURL = cleanURL;
/**
 * splitParams
 * ----------------------------------------------------------------------------
 * Split the parameters included in a URL string into their requisite
 * key-value pairs
 */
function splitParams() {
    let paramStr = window.location.search.replace("?", "");
    let tmp = paramStr.split("&");
    let params = [];
    for (let p of tmp) {
        let splitP = p.split("=");
        let pair = {
            key: splitP[0],
            val: splitP[1]
        };
        params.push(pair);
    }
    return params;
}
exports.splitParams = splitParams;
