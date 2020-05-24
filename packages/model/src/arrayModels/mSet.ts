import { MArray } from './arrayModel';

export class MSet<T> extends MArray<T> {
    public add(val: T) {
        if (this.contains(val)) {
            return false;
        }
        return super.add(val);
    }
}