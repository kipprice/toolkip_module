"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_drawable_1 = require("@kipprice/toolkip-drawable");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
class ImageElement extends toolkip_drawable_1._Drawable {
    //#endregion
    //.....................
    //..........................................
    //#region CREATE THE ELEMENT
    constructor(src) {
        super();
        this._src = src;
        this._createElements();
    }
    get src() { return this._src; }
    set src(src) {
        if (!src) {
            src = "";
        }
        if (this._src === src) {
            return;
        }
        this._src = src;
        this._clearClasses();
        this._elems.img.setAttribute("src", src);
        this._checkForImageLoad();
    }
    _shouldSkipCreateElements() { return true; }
    _createElements() {
        toolkip_create_elements_1.createElement({
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
    _onError() {
        this.src = "";
    }
    //#endregion
    //..........................................
    //..........................................
    //#region ENSURE THAT THE IMAGE IS APPROPRIATELY SIZED
    _checkForImageLoad() {
        if (!this._doesImageHaveMissingSize()) {
            this._measureImage();
            this._resize();
        }
        else {
            window.setTimeout(() => this._checkForImageLoad(), 10);
        }
    }
    _doesImageHaveMissingSize() {
        if (!this._src) {
            return false;
        }
        if (!this._elems.img.offsetHeight) {
            return true;
        }
        if (!this._elems.img.offsetWidth) {
            return true;
        }
        return false;
    }
    _measureImage() {
        let width = this._elems.img.offsetWidth;
        let height = this._elems.img.offsetHeight;
        this._widthToHeightRatio = (width / height);
    }
    _resize() {
        this._clearClasses();
        // no picture
        if (!this._src) {
            toolkip_style_helpers_1.addClass(this._elems.base, "noImage");
        }
        // vertical picture
        else if (this._widthToHeightRatio < 1) {
            toolkip_style_helpers_1.addClass(this._elems.base, "verticalImage");
        }
        // horizontal picture
        else if (this._widthToHeightRatio > 1) {
            toolkip_style_helpers_1.addClass(this._elems.base, "horizontalImage");
            // square picture
        }
        else {
            toolkip_style_helpers_1.addClass(this._elems.base, "squareImage");
        }
    }
    _clearClasses() {
        toolkip_style_helpers_1.removeClass(this._elems.base, "noImage");
        toolkip_style_helpers_1.removeClass(this._elems.base, "verticalImage");
        toolkip_style_helpers_1.removeClass(this._elems.base, "horizontalImage");
        toolkip_style_helpers_1.removeClass(this._elems.base, "squareImage");
    }
}
exports.ImageElement = ImageElement;
//..................
//#region STYLES
ImageElement._uncoloredStyles = {
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
};
