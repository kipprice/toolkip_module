import { StandardElement } from '@toolkip/shared-types';

export interface IPlaceholderReplaceOptions {
    placeholder: string;
    newValue: any;
    uniqueKey?: string;
    baseElem?: StandardElement;
}