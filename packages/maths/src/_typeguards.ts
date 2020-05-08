import { IExtrema } from "./_interfaces";
import { isInterface, IPoint } from '@toolkip/shared-types';
import { IBasicRect } from './_interfaces';

/** 
 * isExtrema
 * ----------------------------------------------------------------------------
 * check if the element is an IExtrema implementation 
 */
export function isIExtrema(test?: any): test is IExtrema {
    let extrema: IExtrema = {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 }
    }

    return isInterface<IExtrema>(test, extrema);
}

/** check if the element is a client rectangle */
export function isClientRect(test: any): test is ClientRect {
    let rect: ClientRect = {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        height: 1,
        width: 1,
    }

    if (isInterface<ClientRect>(test, rect)) { return true; }
    return false;
};

/** check if the element is a SVG rectangle */
export function isSVGRect(test: any): test is SVGRect {
    let rect: SVGRect = {
        x: 1,
        y: 1,
        width: 1,
        height: 1
    } as any as SVGRect;

    if (isInterface<SVGRect>(test, rect)) { return true; }
    return false;
}

/** check if the element is a basic rectangle */
export function isIBasicRect(test: any): test is IBasicRect {
    let rect: IBasicRect = {
        x: 1,
        y: 1,
        w: 1,
        h: 1
    };

    if (isInterface<IBasicRect>(test, rect)) { return true; }
    return false;
}

export function isIPoint(test: any): test is IPoint {
    let pt: IPoint = {
        x: 1,
        y: 1,
        z: 0
    };

    return isInterface<IPoint>(test, pt);
}
