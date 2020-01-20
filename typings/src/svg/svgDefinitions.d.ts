import { Drawable } from "../drawable/drawable";
export declare class SVGDefinitionsElement extends Drawable {
    protected _elems: {
        base: SVGElement;
    };
    get base(): SVGElement;
    protected _gradients: SVGGradientElement[];
    get gradients(): SVGGradientElement[];
    set gradients(data: SVGGradientElement[]);
    protected _shouldSkipCreateElements(): boolean;
    constructor();
    protected _createElements(): void;
    protected _addDropShadow(): void;
}
