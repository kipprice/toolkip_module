import { Drawable } from "../drawable/drawable";
import { IUpdateFunctions, IBindableElement, IViewUpdateFunc, IBoundElemDefinition } from "./_interfaces";
import { BoundUpdateFunction } from "../binding/_interfaces";
import { StandardElement } from "../drawable/_interfaces";
import { UpdateableView } from "./updateableView";
/**----------------------------------------------------------------------------
 * @class	BoundView
 * ----------------------------------------------------------------------------
 * create a view that binds to a view model
 * @author	Kip Price
 * @version	1.0.1
 * ----------------------------------------------------------------------------
 */
export declare abstract class BoundView<VM = any, VC = any> extends Drawable {
    /** allow passing in configurable parameters to the view, separate
     * from the model itself. Controls how elements are created */
    protected _config: VC;
    get config(): VC;
    set config(data: VC);
    /** keep track of the model associated with this view */
    protected _model: VM;
    get model(): VM;
    set model(data: VM);
    /** keep track of each of the update functions */
    protected _updateFunctions: IUpdateFunctions<VM>;
    get updateFunctions(): IUpdateFunctions<VM>;
    set updateFunctions(data: IUpdateFunctions<VM>);
    constructor(config?: VC);
    protected _shouldSkipCreateElements(): boolean;
    protected _getModel(): VM;
    protected _setModel(data: VM): void;
    protected _getConfig(): VC;
    protected _setConfig(data: VC): void;
    protected _onPotentialConfigChange(oldConfig: VC): void;
    /**
     * _onPotentialModelChange
     * ----------------------------------------------------------------------------
     * overridable function to allow for any array-based child views
     */
    protected _onPotentialModelChange(oldModel: VM): void;
    /**
     * _bind
     * ----------------------------------------------------------------------------
     * bind a particular element of the view model to the specified element
     */
    protected _bind<K extends keyof VM>(elem: IBindableElement<VM[K] | VM>, key?: K): void;
    /**
     * _createUpdateFunc
     * ----------------------------------------------------------------------------
     * helper that will generate an update function for binding
     */
    protected _createUpdateFunc<K extends keyof VM>(elem: IBindableElement<VM[K] | VM>, key?: K): BoundUpdateFunction<any>;
    protected _updateHtmlElement<K extends keyof VM>(elem: HTMLElement, value: VM[K] | VM): void;
    protected _updateUpdateable<K extends keyof VM>(elem: UpdateableView<VM[K] | VM>, value: VM[K] | VM): void;
    protected _updateBoundView<K extends keyof VM>(elem: BoundView<VM[K] | VM>, value: VM[K] | VM): void;
    /**
     * setUpdateFunction
     * ----------------------------------------------------------------------------
     * specify how a particular element should be updated when the model updates
     */
    setUpdateFunction(key: keyof VM, updateFunc: IViewUpdateFunc<VM>): void;
    protected _shouldDelete<K extends keyof VM>(elem: IBindableElement<VM[K] | VM>): boolean;
    erase(): void;
    /**
     * _createElement
     * ----------------------------------------------------------------------------
     * wrapper around the standard function for creating elements that handles
     * binding a little more nuanced
     */
    protected _createElement(obj: IBoundElemDefinition<VM>): StandardElement;
    protected _bindElement(elem: IBindableElement<any>, obj: IBoundElemDefinition<VM>): Promise<void>;
}
