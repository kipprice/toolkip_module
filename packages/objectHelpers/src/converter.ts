import { map } from './manipulate';
import { IDictionary } from './_interfaces';

export const dictionaryToArray = <T>(dict: IDictionary<T> = {}): T[] => {
    const out = [];
    map(dict, (val) => {
        out.push(val);
    });
    return out;
}

export const arrayToMap = <T>(array: T[] = []): Map<T, boolean> => {
    const out = new Map<T, boolean>();
    
    for (let val of array) {
        out.set(val, true);
    }

    return out;
}