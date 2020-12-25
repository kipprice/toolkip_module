/** The amount the hue should increase when cycling through new colors */
export const HUE_INTERVAL = 22;

/** The amount that the lightness should increase when cycling through new colors */
export const LIGHT_INTERVAL = 20;

/** The amount that the saturation should increase when cycling through new colors */
export const SATURATION_INTERVAL = 20;

/** The max and min saturation value that should be used for cycling colors */
export const SATURATION_LIMITS = {
    max: 100,
    min: 20
}

/** The max and min lightness values that should be used for cycling colors */
export const LIGHTNESS_LIMITS = {
    max: 80,
    min: 35
}

// https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
export const LIGHT_THRESHOLD = 0.03928
export const LIGHT_DIVISOR = 12.92;
export const DARK_DIVISOR = 1.055;
export const DARK_POW = 2.4;
export const DARK_ADDEND = 0.055;

export const LUM_ADDEND = 0.05;

export const RED_MULT = 0.2126;
export const GREEN_MULT = 0.7152;
export const BLUE_MULT = 0.0722;