"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("./_interfaces");
class CanvasElementStyle {
    /** nothing to construct */
    constructor(style) {
        this._listeners = [];
        // clone the existing style
        if (style) {
            this._fillColor = style.fillColor;
            this._strokeColor = style.strokeColor;
            this._font = style.font;
            this._fontFamily = style.fontFamily;
            this._fontSize = style.fontSize;
            this._fontVariant = style.fontVariant;
            this._strokeSize = style.strokeSize;
            this._textAlign = style.textAlign;
            // or just use defaults
        }
        else {
            this._fillColor = "#000";
            this._strokeColor = "#000";
            this._strokeSize = 1;
            this._fontFamily = "Helvetica";
            this._fontSize = 40;
            this._textAlign = "left";
        }
    }
    get fillColor() { return this._fillColor; }
    set fillColor(color) {
        this._fillColor = color;
        this._onChange(_interfaces_1.StyleChangeEnum.FILL_COLOR);
    }
    get strokeColor() { return this._strokeColor; }
    set strokeColor(color) {
        this._strokeColor = color;
        this._onChange(_interfaces_1.StyleChangeEnum.STROKE_COLOR);
    }
    get fontFamily() { return this._fontFamily; }
    set fontFamily(family) {
        this._fontFamily = family;
        this._onChange(_interfaces_1.StyleChangeEnum.FONT_FAMILY);
    }
    get fontVariant() { return this._fontVariant; }
    set fontVariant(variant) {
        this._fontVariant = variant;
        this._onChange(_interfaces_1.StyleChangeEnum.FONT_VARIANT);
    }
    get fontSize() { return this._fontSize; }
    set fontSize(size) {
        this._fontSize = size;
        this._onChange(_interfaces_1.StyleChangeEnum.FONT_SIZE);
    }
    get strokeSize() { return this._strokeSize; }
    set strokeSize(size) {
        this._strokeSize = size;
        this._onChange(_interfaces_1.StyleChangeEnum.STROKE_SIZE);
    }
    get textAlign() { return this._textAlign; }
    set textAlign(align) {
        this._textAlign = align;
        this._onChange(_interfaces_1.StyleChangeEnum.TEXT_ALIGN);
    }
    get font() {
        if (this._font) {
            return this._font;
        }
        let variant = (this._fontVariant ? this._fontVariant + " " : "");
        let size = (this._fontSize ? this._fontSize + "px " : "");
        return variant + size + this._fontFamily;
    }
    set font(font) {
        this._font = font;
        this._onChange(_interfaces_1.StyleChangeEnum.FONT);
    }
    addStyleChangeListener(changeType, func) {
        if (!this._listeners[changeType]) {
            this._listeners[changeType] = [];
        }
        // Add to the array of listeners
        this._listeners[changeType].push(func);
    }
    _onChange(changeType) {
        if (!this._listeners[changeType]) {
            return;
        }
        let listener;
        for (listener of this._listeners[changeType]) {
            listener();
        }
    }
    setStyle(context) {
        this._saveOffOldStyle(context);
        this._applyStyleToContext(context, this);
    }
    restoreStyle(context) {
        this._applyStyleToContext(context, this._oldStyle);
    }
    _saveOffOldStyle(context) {
        this._oldStyle = new CanvasElementStyle();
        this._oldStyle.fillColor = context.fillStyle;
        this._oldStyle.strokeColor = context.strokeStyle;
        this._oldStyle.font = context.font;
        this._oldStyle.strokeSize = context.lineWidth;
        this._oldStyle.textAlign = context.textAlign;
    }
    _applyStyleToContext(context, style) {
        context.fillStyle = style.fillColor;
        context.strokeStyle = style.strokeColor;
        context.textAlign = style.textAlign;
        context.font = style.font;
        context.lineWidth = style.strokeSize;
    }
}
exports.CanvasElementStyle = CanvasElementStyle;
