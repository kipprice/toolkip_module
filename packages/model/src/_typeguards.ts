import { Model } from "./_model";

export const isModel = (test: any): test is Model => {
    if (test instanceof Model) { return true; }
    return false;
}