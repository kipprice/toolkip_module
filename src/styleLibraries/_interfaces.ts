import { StandardElement } from "../shared";

export interface IPlaceholderReplaceOptions {
    placeholder: string;
    newValue: any;
    uniqueKey?: string;
    baseElem?: StandardElement;
}