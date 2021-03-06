import { _Drawable } from '@toolkip/drawable';
import { IStandardStyles, addClass, removeClass } from '@toolkip/style-helpers';
import { createElement } from '@toolkip/create-elements';

export class ImageElement extends _Drawable<"imageElementPrimary"> {

    //..................
    //#region STYLES

    protected static _uncoloredStyles: IStandardStyles = {
        ".imageWrapper": {
            backgroundColor: "<imageElementPrimary>",

            nested: {
                "&.verticalImage img": {
                    width: "auto",
                    height: "100%"
                },

                "&.horizontalImage img": {
                    width: "100%",
                    height: "auto"
                },

                "&.squareImage img": {
                    width: "100%",
                    height: "100%"
                },

                "&.noImage": {
                    display: "none",

                    nested: {
                        "img": {
                            display: "none"
                        }
                    }
                }
            }
        }
    }

    //#endregion
    //..................

    //.....................
    //#region PROPERTIES

    protected _elems: {
        base: HTMLElement;
        img: HTMLImageElement;
    }

    protected _src: string;
    public get src(): string { return this._src; }
    public set src(src: string) {
        if (!src) { src = ""; }
        if (this._src === src) { return; }
        this._src = src;
        this._clearClasses();
        this._elems.img.setAttribute("src", src);
        this._checkForImageLoad();
    }

    protected _widthToHeightRatio: number;

    //#endregion
    //.....................

    //..........................................
    //#region CREATE THE ELEMENT

    public constructor(src: string) {
        super();
        this._src = src;
        this._createElements();
    }

    protected _shouldSkipCreateElements() { return true; }

    protected _createElements(): void {
        createElement({
            key: "base",
            cls: "imageWrapper" + (this._src ? "" : " noImage"),
            children: [{
                key: "img",
                type: "img",
                attr: {
                    src: this._src ? this._src : ""
                },
                eventListeners: {
                    error: () => this._onError()
                }
            }]
        }, this._elems);
    }

    protected _onError(): void {
        this.src = "";
    }

    //#endregion
    //..........................................

    //..........................................
    //#region ENSURE THAT THE IMAGE IS APPROPRIATELY SIZED

    protected _checkForImageLoad(): void {
        if (!this._doesImageHaveMissingSize()) {
            this._measureImage();
            this._resize();
        }
        else {
            window.setTimeout(() => this._checkForImageLoad(), 10);
        }
    }

    protected _doesImageHaveMissingSize(): boolean {
        if (!this._src) { return false; }
        if (!this._elems.img.offsetHeight) { return true; }
        if (!this._elems.img.offsetWidth) { return true; }
        return false;
    }

    protected _measureImage(): void {
        let width = this._elems.img.offsetWidth;
        let height = this._elems.img.offsetHeight;

        this._widthToHeightRatio = (width / height);
    }

    protected _resize(): void {
        this._clearClasses();

        // no picture
        if (!this._src) {
            addClass(this._elems.base, "noImage");
        }

        // vertical picture
        else if (this._widthToHeightRatio < 1) {
            addClass(this._elems.base, "verticalImage");
        }

        // horizontal picture
        else if (this._widthToHeightRatio > 1) {
            addClass(this._elems.base, "horizontalImage");

            // square picture
        } else {
            addClass(this._elems.base, "squareImage");
        }
    }

    protected _clearClasses(): void {
        removeClass(this._elems.base, "noImage");
        removeClass(this._elems.base, "verticalImage");
        removeClass(this._elems.base, "horizontalImage");
        removeClass(this._elems.base, "squareImage");
    }

    //#endregion
    //..........................................
}
