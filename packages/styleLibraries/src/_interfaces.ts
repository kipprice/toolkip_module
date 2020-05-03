import { StandardElement } from '@kipprice/toolkip-shared";

export interface IPlaceholderReplaceOptions {
    placeholder: string;
    newValue: any;
    uniqueKey?: string;
    baseElem?: StandardElement;
}