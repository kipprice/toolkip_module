import { IConstructor } from "..";
import { Stylable } from ".";

/**
 * preemptivelyCreateStyles
 * ----------------------------------------------------------------------------
 * optional function that can generate a set of styles on page load, to speed 
 * up experience elsewhere
 * 
 * @param   constructor     Class constructor for the stylable to pre-initialize
 */
export function preemptivelyCreateStyles(constructor: IConstructor<Stylable>): void {
    window.setTimeout(() => {
        new constructor();
    }, 0);
    
}