import { IDictionary } from '@toolkip/object-helpers';

/**----------------------------------------------------------------------------
 * @class	IdentifierAssigner
 * ----------------------------------------------------------------------------
 * keep track of unique IDs across the application
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _IdentifierAssigner {

    //.....................
    //#region PROPERTIES
    
    protected _lastIds: IDictionary<number> = {"id": 0 };
    public getLastId(uniqueKey: string) { return this._lastIds[uniqueKey]; }
    
    //#endregion
    //.....................

    private _cleanUniqueKey(suffix?: string) {
        if (!suffix) { return "id"; }
        return suffix.replace(/-/g, "_");
    }

    private _getNumericId(lastId: string): number {
        const pieces = lastId.split("-");

        let numericId = NaN;
        for (let pc of pieces) {
            const parsedPiece = parseInt(pc);
            if (!isNaN(parsedPiece)) { 
                numericId = parsedPiece;
            }
        }
        return numericId;
    }

    /**
     * generateUniqueId
     * ----------------------------------------------------------------------------
     * updates the set of recognized keys 
     */
    public generateUniqueId(uniqueKey?: string, supplementalSuffix?: string): string {

        // set a default suffix if needed
        uniqueKey = this._cleanUniqueKey(uniqueKey);
        
        // generate the next ID to use
        const nextId = (this._lastIds[uniqueKey] || 0) + 1;
        this._lastIds[uniqueKey] = nextId;
        
        // return the string version of this ID
        if (supplementalSuffix) {
            return `${nextId}-${supplementalSuffix}`
        } else {
            return `${nextId}`;
        }
    }

    /**
     * updateLastId
     * ----------------------------------------------------------------------------
     * ensure that we can load in identifiers from outside sources
     */
    public registerId(idToRegister: string, uniqueKey?: string): boolean {
        const lastId = this._getNumericId(idToRegister);
        const key = this._cleanUniqueKey(uniqueKey);

        // quit if we weren't able to parse out the 
        // id associated with this 
        if (isNaN(lastId)) { return false; }

        // verify that we need to update this ID
        if (lastId <= this._lastIds[key]) { return false; }

        // register the id back
        this._lastIds[key] = lastId;
        return true;
    }

    public reset(uniqueKey?: string): void {
        const key = this._cleanUniqueKey(uniqueKey);
        this._lastIds[key] = 0;
    }

}

export const IdentifierAssigner = new _IdentifierAssigner();


export function generateUniqueId(uniqueKey?: string, supplementalSuffix?: string): string {
    return IdentifierAssigner.generateUniqueId(uniqueKey, supplementalSuffix);
}

export function registerUniqueId(lastId: string, uniqueKey?: string): boolean {
    return this.IdentifierAssigner.registerId(lastId, uniqueKey);
}