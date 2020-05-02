import { IDictionary } from "..";

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
    public getLastId(prefix: string) { return this._lastIds[prefix]; }
    
    //#endregion
    //.....................

    private _cleanPrefix(prefix?: string) {
        if (!prefix) { return "id"; }
        return prefix.replace(/-/g, "_");
    }

    private _splitId(lastId: string) {
        const [strId, prefix] = lastId.split("-");
        const numericId = parseInt(strId);

        return {
            prefix: this._cleanPrefix(prefix), 
            id: numericId
        }
    }

    /**
     * generateUniqueId
     * ----------------------------------------------------------------------------
     * updates the set of recognized keys 
     */
    public generateUniqueId(prefix?: string): string {

        // set a default prefix if needed
        prefix = this._cleanPrefix(prefix);
        
        // generate the next ID to use
        const nextId = (this._lastIds[prefix] || 0) + 1;
        this._lastIds[prefix] = nextId;
        
        // return the string version of this ID
        return `${nextId}-${prefix}`;
    }

    /**
     * updateLastId
     * ----------------------------------------------------------------------------
     * ensure that we can load in identifiers from outside sources
     */
    public registerId(lastId: string): boolean {
        const { prefix, id } = this._splitId(lastId);

        // quit if we weren't able to parse out the 
        // id associated with this 
        if (isNaN(id)) { return false; }

        // verify that we need to update this ID
        if (id <= this._lastIds[prefix]) { return false; }

        // 
        this._lastIds[prefix] = id;
        return true;
    }

    public reset(prefix?: string): void {
        prefix = this._cleanPrefix(prefix);
        this._lastIds[prefix] = 0;
    }
}

export const IdentifierAssigner = new _IdentifierAssigner();


export function generateUniqueId(prefix?: string): string {
    return IdentifierAssigner.generateUniqueId(prefix);
}

export function registerUniqueId(lastId: string): boolean {
    return this.IdentifierAssigner.registerId(lastId);
}