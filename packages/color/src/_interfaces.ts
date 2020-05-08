export enum HSLPieceEnum {
	HUE = 1,
	SATURATION = 2,
	LIGHTNESS = 3,
	ALPHA = 4
}

export enum RGBEnum {
	RED = 0,
	GREEN = 1,
	BLUE = 2,
	ALPHA = 3
}

export interface IColorMultipliers { 
	hue: number;
	saturation: number;
	lightness: number; 
	alpha: number;
}