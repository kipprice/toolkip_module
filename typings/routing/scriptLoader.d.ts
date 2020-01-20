/**----------------------------------------------------------------------------
 * @class   ScriptLoader
 * ----------------------------------------------------------------------------
 * Dynamically load a JS file to the document
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class ScriptLoader {
    /** the string that will be formatted to be the appropriate JS file */
    protected _scriptURLFormat: string;
    /**
     * ScriptLoader
     * ----------------------------------------------------------------------------
     * Initialize the script loader with the appropriate format function
     */
    constructor(format: string);
    /**
     * _loadScript
     * ----------------------------------------------------------------------------
     * Dynamically load a particular script
     * @param   script  unique piece that should be applied in our formatted string
     *                  to load this particular URL
     */
    loadScript(script: string): void;
}
