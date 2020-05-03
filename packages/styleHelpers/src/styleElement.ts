import { IStandardStyles } from './_interfaces';
import { stringifyStyles } from './stringifier';

/**----------------------------------------------------------------------------
 * @class	StyleElementGenerator
 * ----------------------------------------------------------------------------
 * handle creating style elements & adding them to the document
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _StyleElementGenerator {
    //..........................................
    //#region CREATE A STYLE ELEMENT
    
    /**
     * createElement
     * ----------------------------------------------------------------------------
     * Create the element that will then be added to the document 
     * @param   findExisting    If true, returns the first existing style tag in the document
     * @returns The created style element
     */
    public createElement(id?: string): HTMLStyleElement {
        return this._createElement(id);
    }

    private _createElement(id?: string): HTMLStyleElement {
        let elem: HTMLStyleElement;

        // check to see if there is already a style tag with the specified ID
        if (id) {
            elem = document.getElementById(id) as HTMLStyleElement;
            if (elem) { return elem; }
        }

        // if we couldn't find an element, generate a new one
        elem = document.createElement("style");
        if (id) { elem.setAttribute("id", id); }
        return elem;
    }
    
    //#endregion
    //..........................................

    //..........................................
    //#region CREATE AN ELEMENT FOR A SET OF STYLES
    
    public createElementForStyles(styles: IStandardStyles, id?: string, addToDocument?: boolean): HTMLStyleElement[] {
        if (!styles) { return []; }
        return this._createElementForStyles(styles, id, addToDocument);
    }

    private _createElementForStyles(styles: IStandardStyles, id?: string, addToDocument?: boolean): HTMLStyleElement[] {
        let stringified = stringifyStyles(styles);
        let out = [];

        for (let s of stringified) {
            let elem = this._createElement(id);
            elem.innerHTML = s;
            if (addToDocument) { document.head.appendChild(elem); }
            out.push(elem);
        }

        return out;
    }
    
    //#endregion
    //..........................................
}

const StyleElementGenerator = new _StyleElementGenerator();

//..........................................
//#region EXPORTED FUNCTIONS

export function createStyleElement(id?: string) {
    return StyleElementGenerator.createElement(id);
}

export function createElementForStyles(styles: IStandardStyles, id?: string, addToDocument?: boolean) {
    return StyleElementGenerator.createElementForStyles(styles, id, addToDocument)
}

//#endregion
//..........................................
