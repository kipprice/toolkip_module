import { Color } from './colors';
import { BLUE_MULT, DARK_ADDEND, DARK_DIVISOR, DARK_POW, GREEN_MULT, LIGHT_DIVISOR, LIGHT_THRESHOLD, LUM_ADDEND, RED_MULT } from './_constants';



export const getLightOrDark = (color: string): 'light' | 'dark' => {
    const lum = calculateLuminance(color);
    console.log(`color: ${color} lum: ${lum}`)
    return lum > 0.5 ? 'light' : 'dark';
}

const calculateLuminance = (color: string): number => {
    const c = new Color(color);
    const colors = [c.red, c.green, c.blue];  

    const adjustedColors = colors.map((c) => {
        const percentage = c / 255;
        return (
            percentage < LIGHT_THRESHOLD ?
            percentage / LIGHT_DIVISOR :
            Math.pow((percentage + DARK_ADDEND) / DARK_DIVISOR, DARK_POW)
        ); 
    })

    return (adjustedColors[0] * RED_MULT) + (adjustedColors[1] * GREEN_MULT) + (adjustedColors[2] * BLUE_MULT);
}