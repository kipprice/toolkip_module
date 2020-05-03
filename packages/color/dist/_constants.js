"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** The amount the hue should increase when cycling through new colors */
exports.HUE_INTERVAL = 22;
/** The amount that the lightness should increase when cycling through new colors */
exports.LIGHT_INTERVAL = 20;
/** The amount that the saturation should increase when cycling through new colors */
exports.SATURATION_INTERVAL = 20;
/** The max and min saturation value that should be used for cycling colors */
exports.SATURATION_LIMITS = {
    max: 100,
    min: 20
};
/** The max and min lightness values that should be used for cycling colors */
exports.LIGHTNESS_LIMITS = {
    max: 80,
    min: 35
};
