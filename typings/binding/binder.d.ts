import { IDictionary } from '../objectHelpers/_interfaces';
import { IEqualityFunction } from '../comparable/comparable';
import { IBindingDetails, BoundDeleteFunction, BoundUpdateFunction, BoundEvalFunction } from './_interfaces';
/**----------------------------------------------------------------------------
 * @class	Binder
 * ----------------------------------------------------------------------------
 * keeps track of all bound elements and consolidates into a single animation
 * frame event; prevents poor performance with lots of bound views
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
declare class _Binder {
    protected _boundDetails: IDictionary<IBindingDetails<any>>;
    protected _id: number;
    protected _started: boolean;
    protected _getNextId(): string;
    constructor();
    bind<T = any>(evalFunc: BoundEvalFunction<T>, updateFunc: BoundUpdateFunction<T>, deleteFunc?: BoundDeleteFunction, equalsFunc?: IEqualityFunction<T>): string;
    unbind(key: string): boolean;
    protected _startAnimationLoop(): void;
    protected _onFrame(): Promise<void>;
    protected _handlingBinding<T>(details: IBindingDetails<T>): Promise<void>;
}
export declare const Binder: _Binder;
export {};
