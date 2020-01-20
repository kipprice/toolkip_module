import { IKeyValPair } from "../objectHelpers/_interfaces";
import { ScriptLoader } from "./scriptLoader";
/**----------------------------------------------------------------------------
 * @class   Router
 * ----------------------------------------------------------------------------
 * Assist with routing based on the URL loaded
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare abstract class Router {
    /** allow loading of script files dynamically */
    protected _loader: ScriptLoader;
    /**
     * route
     * ----------------------------------------------------------------------------
     * Route this page to a particular set of code, based on details on the
     * URL that brought us here
     */
    route(): void;
    /**
     * _createScriptLoader
     * ----------------------------------------------------------------------------
     * Overridable function that determines how JS files are dynamically loaded
     */
    protected _createScriptLoader(): void;
    /**
     * _route
     * ----------------------------------------------------------------------------
     * Overridable function that looks to the details of the current URL &
     * determines what scripts to load
     * @param   url     Current URL, without additional parameters
     * @param   params  Parameters for the current URL
     */
    protected abstract _route(url: string, params: IKeyValPair<string>[]): void;
}
