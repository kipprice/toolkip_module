import { IIdentifiable } from '.';

export const isIdentifiable = (test: any): test is IIdentifiable => {
    if (test.id) { return true; }
    return false;
}