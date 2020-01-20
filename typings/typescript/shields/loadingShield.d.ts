import { Shield } from "./shield";
import { ILoadingShieldElements } from "./_interfaces";
import { IStandardStyles } from "../styleHelpers/_interfaces";
/**
 * @class LoadingShield
 *
 * Show a loading indication
 * @version 1.0.0
 * @author  Kip Price
 *
 */
export declare class LoadingShield extends Shield {
    /** elements that make up this shield */
    protected _elems: ILoadingShieldElements;
    /** text to display as we display the shield */
    protected _loadingText: string;
    /** styles for the loading shield */
    protected static _uncoloredStyles: IStandardStyles;
    /** make sure we return the right set of styles */
    protected _getUncoloredStyles(): IStandardStyles;
    /**
     * Create a loading shield
     * @param   loadingText   Additional etxt to display while loading
     *
     */
    constructor(loadingText?: string);
    /** skip creating elements before data is set */
    protected _shouldSkipCreateElements(): boolean;
    /**
     * _createShieldDetails
     *
     * Create
     *
     */
    protected _createShieldDetails(): void;
}
