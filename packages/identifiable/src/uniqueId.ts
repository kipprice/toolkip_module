import { IDictionary } from '@toolkip/object-helpers';
import { InvalidIdType } from './_interfaces';

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
    public getLastId(suffix: string) { return this._lastIds[suffix]; }
    
    //#endregion
    //.....................

    private _cleanSuffix(suffix?: string) {
        if (!suffix) { return "id"; }
        return suffix.replace(/-/g, "_");
    }

    private _splitId(lastId: string) {
        const [strId, suffix] = lastId.split("-");
        const numericId = parseInt(strId);

        return {
            suffix: this._cleanSuffix(suffix), 
            id: numericId
        }
    }

    /**
     * generateUniqueId
     * ----------------------------------------------------------------------------
     * updates the set of recognized keys 
     */
    public generateUniqueId(suffix?: string): string {

        // set a default suffix if needed
        suffix = this._cleanSuffix(suffix);
        
        // generate the next ID to use
        const nextId = (this._lastIds[suffix] || 0) + 1;
        this._lastIds[suffix] = nextId;
        
        // return the string version of this ID
        return `${nextId}-${suffix}`;
    }

    /**
     * updateLastId
     * ----------------------------------------------------------------------------
     * ensure that we can load in identifiers from outside sources
     */
    public registerId(lastId: string, supplementalSuffix?: string): boolean {
        const { suffix, id } = this._splitId(lastId);

        // quit if we weren't able to parse out the 
        // id associated with this 
        if (isNaN(id)) { return false; }

        // verify that we need to update this ID
        if (id <= this._lastIds[suffix]) { return false; }

        // register the id back
        this._lastIds[suffix] = id;
        return true;
    }

    public reset(suffix?: string): void {
        suffix = this._cleanSuffix(suffix);
        this._lastIds[suffix] = 0;
    }

    public isInvalidId(id: string, expectedSuffix?: string): InvalidIdType {
        const { suffix } = this._splitId(id);
        if (!suffix && expectedSuffix) { return InvalidIdType.MISSING_SUFFIX; }
        if (expectedSuffix !== suffix) { return InvalidIdType.WRONG_SUFFIX; }
        return InvalidIdType.VALID;
    }
}

export const IdentifierAssigner = new _IdentifierAssigner();


export function generateUniqueId(suffix?: string): string {
    return IdentifierAssigner.generateUniqueId(suffix);
}

export function registerUniqueId(lastId: string, suffix?: string): boolean {
    return this.IdentifierAssigner.registerId(lastId, suffix);
}