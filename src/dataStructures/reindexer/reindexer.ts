import { IDictionary } from "../../objectHelpers";

export class Indexer<T> {

    //.....................
    //#region PROPERTIES
    
    protected _data: T[];
    
    //#endregion
    //.....................

    constructor() {
        this._data = [];
    }

    public add(elem: T): boolean {
        this._data.push(elem)
        return true;
    }

    public remove(): boolean { 
        return false;
    }

    public index<
        R extends IDictionary<any>, 
        K extends keyof T
    >(curDict?: R, ...keysToIndex: K[]): R {
        if (keys.length === 0) { return curDict; }
        
    }
}