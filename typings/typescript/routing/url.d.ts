import { IKeyValPair } from "../objectHelpers/_interfaces";
/**
 * cleanURL
 * ----------------------------------------------------------------------------
 * Generate the current URL without any additional parameters
 */
export declare function cleanURL(): string;
/**
 * splitParams
 * ----------------------------------------------------------------------------
 * Split the parameters included in a URL string into their requisite
 * key-value pairs
 */
export declare function splitParams(): IKeyValPair<string>[];
