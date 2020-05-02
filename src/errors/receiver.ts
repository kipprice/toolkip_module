import { ErrorRenderer } from "./_interfaces";
import { SilentRenderer } from "./renderers/silentRenderer";

/**----------------------------------------------------------------------------
 * @class	ErrorReceiver
 * ----------------------------------------------------------------------------
 * give an easy way to show or hide errors; will swallow unless specifically 
 * specified that the error state is in debug mode
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _ErrorReceiver {
    
    //.....................
    //#region PROPERTIES
    
    /** keep track of how these errors should be rendered */
    private _renderer: ErrorRenderer;
    public set renderer(r: ErrorRenderer) { this._renderer = r; }
    public get renderer() { return this._renderer; }
    
    //#endregion
    //.....................

    /**
     * ErrorReceiver
     * ----------------------------------------------------------------------------
     * default to rendering silently; a caller can get at the details within the
     * error stack whenever they need to
     */
    constructor() {
        this._renderer = new SilentRenderer();
    }

    public error(details: any) {
        return this._renderer.error(details);
    }

    public warn(details: any) {
        return this._renderer.warn(details);
    }

    public log(details: any) {
        return this._renderer.log(details);
    }

}

export const ErrorReceiver = new _ErrorReceiver();

export function error(details: any) {
    ErrorReceiver.error(details);
}

export function warn(details: any) {
    ErrorReceiver.warn(details);
}

export function log(details: any) {
    ErrorReceiver.log(details);
}