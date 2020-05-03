"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * ElementType
 *
 * The type of element we're drawing
 *
 */
var ElementType;
(function (ElementType) {
    ElementType[ElementType["Rectangle"] = 0] = "Rectangle";
    ElementType[ElementType["Text"] = 1] = "Text";
    ElementType[ElementType["Circle"] = 2] = "Circle";
    ElementType[ElementType["Path"] = 3] = "Path";
    ElementType[ElementType["Group"] = 4] = "Group";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
/**
 * EventTypeEnum
 *
 * Handle all of the events we might need
 *
 */
var EventTypeEnum;
(function (EventTypeEnum) {
    EventTypeEnum[EventTypeEnum["CLICK"] = 0] = "CLICK";
    EventTypeEnum[EventTypeEnum["HOVER"] = 1] = "HOVER";
    EventTypeEnum[EventTypeEnum["LEAVE"] = 2] = "LEAVE";
    EventTypeEnum[EventTypeEnum["R_CLICK"] = 3] = "R_CLICK";
    EventTypeEnum[EventTypeEnum["DBL_CLICK"] = 4] = "DBL_CLICK";
    EventTypeEnum[EventTypeEnum["KEY_PRESS"] = 5] = "KEY_PRESS";
    EventTypeEnum[EventTypeEnum["FOCUS"] = 6] = "FOCUS";
    EventTypeEnum[EventTypeEnum["BLUR"] = 7] = "BLUR";
})(EventTypeEnum = exports.EventTypeEnum || (exports.EventTypeEnum = {}));
;
var StyleChangeEnum;
(function (StyleChangeEnum) {
    StyleChangeEnum[StyleChangeEnum["FILL_COLOR"] = 0] = "FILL_COLOR";
    StyleChangeEnum[StyleChangeEnum["STROKE_COLOR"] = 1] = "STROKE_COLOR";
    StyleChangeEnum[StyleChangeEnum["FONT_FAMILY"] = 2] = "FONT_FAMILY";
    StyleChangeEnum[StyleChangeEnum["FONT_VARIANT"] = 3] = "FONT_VARIANT";
    StyleChangeEnum[StyleChangeEnum["FONT_SIZE"] = 4] = "FONT_SIZE";
    StyleChangeEnum[StyleChangeEnum["STROKE_SIZE"] = 5] = "STROKE_SIZE";
    StyleChangeEnum[StyleChangeEnum["TEXT_ALIGN"] = 6] = "TEXT_ALIGN";
    StyleChangeEnum[StyleChangeEnum["FONT"] = 7] = "FONT";
})(StyleChangeEnum = exports.StyleChangeEnum || (exports.StyleChangeEnum = {}));
;
