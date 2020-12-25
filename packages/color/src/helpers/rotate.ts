import { roundToPlace } from '@toolkip/maths';
import { _Color } from '../colors';
import { HUE_INTERVAL, LIGHTNESS_LIMITS, LIGHT_INTERVAL, SATURATION_INTERVAL, SATURATION_LIMITS } from '../_constants';
import { HSLPieceEnum } from '../_interfaces';


/**
 * getNextColor
 * ----------------------------------------------------------------------------
 * Grabs the next hue available for this color selector.
 * Can be used as a random color generator
 *
 * @param	firstRotate		The HSL pice that should be rotating first
 * @param 	withAlpha 		True if the alpha value should also be included in the output string
 *
 * @returns The hex color string for the new color
 */
export const getNextColor = (color: _Color, startingColor: _Color, firstRotate: HSLPieceEnum, withAlpha?: boolean): _Color => {

    const out = color.clone();

    // Fill in our array of the order in which we will cycle the values
    const toCycle = [];
    toCycle[0] = firstRotate;
    toCycle[1] = (firstRotate + 1) % 3;
    toCycle[2] = (firstRotate + 2) % 3;

    // Loop through the cycles and set their values
    for (let idx = 0; idx < toCycle.length; idx += 1) {
        rotateAppropriateHSLValue(out, toCycle[idx])
        if (startingColor.getHslValue(toCycle[idx]) !== out.getHslValue(toCycle[idx])) {
            break;
        }
    }

    // Update the RGB values too
    out.generateRgbValues();
    return out;
};

/**
 * rotateAppropriateHSLValue
 * ----------------------------------------------------------------------------
 * Calculates the next appropriate value for the HSL type, and
 * @param 	idx		The type of HSL values we should rotate
 * @returns	True if a full circle has been made for this particular index; 
 * 			False otherwise
 */
export const rotateAppropriateHSLValue = (color: _Color, idx: HSLPieceEnum) => {

    const out = color.clone();

    // update the specified value
    switch (idx) {
        case HSLPieceEnum.SATURATION:
            rotateSaturation(out);
            break;

        case HSLPieceEnum.LIGHTNESS:
            rotateLightness(out);
            break;

        case HSLPieceEnum.HUE:
            rotateHue(out);
            break;
    }

    return out;
};

/**
 * rotateHue
 * ----------------------------------------------------------------------------
 * Rotates our current hue value a set amount
 * @returns The new hue value for the color
 */
const rotateHue = (color: _Color) => {
    color.hue = rotateHslValue(color.hue, HUE_INTERVAL, 360);
    return color;
};

/**
 * rotateSaturation
 * ----------------------------------------------------------------------------
 * Get the next saturation value for this color
 * @returns	The next saturation value
 */
const rotateSaturation = (color: _Color) => {
    color.saturation = rotateHslValue(color.saturation, SATURATION_INTERVAL, 100, SATURATION_LIMITS.max, SATURATION_LIMITS.min);
    return color;
};

/**
 * rotateLightness
 * ----------------------------------------------------------------------------
 * Get the next lightness value for this color
 * @returns	The next lightness value
 */
const rotateLightness = (color: _Color) => {
    color.lightness = rotateHslValue(color.lightness, LIGHT_INTERVAL, 100, LIGHTNESS_LIMITS.max, LIGHTNESS_LIMITS.min)
    return color;
}

/**
 * rotateHslValue
 * ----------------------------------------------------------------------------
 * Rotates a given HSL value by an appropriate interval to get a new color
 *
 * @param 	startVal	The value the HSL value started with
 * @param 	inc 		How much the HSL value should be incremented
 * @param 	modBy		What the mod of the HSL value should be
 * @param 	max			The maximum this HSL value can be
 * @param 	min			The minimum this HSL value can be
 *
 * @returns The newly rotate HSL value
 */
const rotateHslValue = (startVal: number, inc: number, modBy: number, max?: number, min?: number) => {

    // Increment and mod
    let out = startVal += inc;
    out %= modBy;

    // If we have neither max nor min, quit now
    if (!max) { return roundToPlace(out, 10); }
    if (!min && (min !== 0)) { return roundToPlace(out, 10); }

    // Loop until we have an acceptable value
    while ((out < min) || (out > max)) {
        out = startVal += inc;
        out %= modBy;
    }

    // Return the appropriate value
    return roundToPlace(out, 10);
};