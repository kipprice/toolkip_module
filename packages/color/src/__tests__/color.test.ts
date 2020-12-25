import { Color } from '../colors';
import { calculateContrast } from '../helpers';

describe('basic color tests', () => {
    it('can create a color from a hex string', () => {
        const c = new Color('#FF0102');
        expect(c.red).toEqual(255);
        expect(c.green).toEqual(1);
        expect(c.blue).toEqual(2);
    })

    it('can create a color from a HSL string', () => {
        const c = new Color("hsl(160, 50%, 45%)");
        expect(c.hue).toEqual(160);
        expect(c.saturation).toEqual(50);
        expect(c.lightness).toEqual(45);
    })

    it('converts between hsl <-> rgb', () => {
        const c = new Color("hsl(160, 50%, 45%)");
        expect(c.toHexString().toUpperCase()).toEqual("#39AC86")
        expect(c.toHslString()).toEqual("hsl(160, 50%, 45%)")
    })

    it('converts from explicit alpha to embedded', () => {
        const c = new Color("#010203", 0.5);
        expect(c.toHexAlphaString()).toEqual("#01020380");
        expect(c.toRgbaString()).toEqual("rgba(1, 2, 3, 0.5)")
    })

    it('converts embedded alpha to explicit', () => {
        const c = new Color("#01020380");
        expect(c.alpha).toEqual(0.5);
        expect(c.toRgbaString()).toEqual("rgba(1, 2, 3, 0.5)");
    })
})

describe('luminance and contrast', () => {
    it('calculates luminance correctly', () => {
        const c = new Color("#FA7014");
        expect(c.luminance).toEqual(31.96);
    })

    it('calculates contrast correctly', () => {
        const c1 = new Color("#FA7014");
        const c2 = new Color("#FFFFFF");
        const contrast = calculateContrast(c1, c2);

        expect(contrast).toEqual(2.84)
    })

    it('calculates 100% difference', () => {
        const contrast = calculateContrast("#000", "#FFF");
        expect(contrast).toEqual(21);
    })

    it('can determine light colors', () => {
        const light = new Color("#DDD");
        const dark = new Color("#333");
        expect(light.isLight()).toBeTruthy();
        expect(dark.isLight()).toBeFalsy();
    })

    it('can determine dark colors', () => {
        const light = new Color("#DDD");
        const dark = new Color("#333");
        expect(light.isDark()).toBeFalsy();
        expect(dark.isDark()).toBeTruthy();
    })
})