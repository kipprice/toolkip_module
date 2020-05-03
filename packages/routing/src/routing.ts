import { IKeyValPair } from '@kipprice/toolkip-object-helpers';
import { ScriptLoader } from "./scriptLoader";
import { cleanURL, splitParams } from "./url";


/**----------------------------------------------------------------------------
 * @class   Router
 * ----------------------------------------------------------------------------
 * Assist with routing based on the URL loaded
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export abstract class _Router {

    /** allow loading of script files dynamically */
    protected _loader: ScriptLoader;

    /**
     * route
     * ----------------------------------------------------------------------------
     * Route this page to a particular set of code, based on details on the
     * URL that brought us here
     */
    public route(): void {
        this._route(
            cleanURL(),
            splitParams()
        )
    }

    /**
     * _createScriptLoader
     * ----------------------------------------------------------------------------
     * Overridable function that determines how JS files are dynamically loaded
     */
    protected _createScriptLoader(): void {
        this._loader = new ScriptLoader("{0}");
    }

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
