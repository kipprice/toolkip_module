import { IDrawableElements } from "@kipprice/toolkip-drawable";
import { TestResults } from '../_interfaces';

/**
 * IUnitTestElems
 * ----------------------------------------------------------------------------
 * Elements for unit tests
 */
export interface IUnitTestElems extends IDrawableElements {
    testContainer: HTMLElement;
}

export interface VisualResults<T> extends TestResults<T> {
    value: string;
    passStr: string;
}