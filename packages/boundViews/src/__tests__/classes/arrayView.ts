import { _BoundView } from '../../_boundView';
import { ISimpleModel } from './_interfaces';
import { SimpleBoundView } from './simpleview';

export class ArrayBoundView extends _BoundView<ISimpleModel[]> {
    protected _createElements(...args: any[]): void {   
        this._createBase({
            key: "base",
            bindTo: {
                key: "_",
                mapToDrawable: SimpleBoundView
            }
        })
    }
}