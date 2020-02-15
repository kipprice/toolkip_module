import { StandardElement } from "../drawable";

export interface IPlaceholderReplaceOptions {
    placeholder: string;
    newValue: any;
    uniqueKey?: string;
    baseElem?: StandardElement;
}