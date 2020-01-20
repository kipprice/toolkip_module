import { IDictionary } from "../objectHelpers/_interfaces";
import { TypedClassDefinition } from "./_interfaces";
/**----------------------------------------------------------------------------
 * @class	TransitionController
 * ----------------------------------------------------------------------------
 * keep track of the transitions that have been performed & manage generating
 * new ones
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
declare class _TransitionController {
    /** the last identifier we used for a generated class */
    protected _lastClsId: number;
    /** all classes that we've already generated; key is the string version of the class, value is the class ID */
    protected _generatedClasses: IDictionary<string, string>;
    /** element in which these transitional classes will be added */
    protected _styleElem: HTMLStyleElement;
    /**
     * transition
     * ----------------------------------------------------------------------------
     * add a transitionary class to the specified element
     *
     * @param   details     object containing details about the transition to be
     *                      performed
     *
     * @returns     A promise that resolves once the transition is over
     */
    transition(details: ITransitionDetails): Promise<void>;
    /**
     * transitionProoerty
     * ----------------------------------------------------------------------------
     * TODO
     */
    protected transitionProperty(details: IPropertyTransition): Promise<void>;
    /**
     * _getClassName
     * ----------------------------------------------------------------------------
     * gets an existing class name if one exists for this style config; otherwise
     * creates a new generated class name
     *
     * @param   classDef    the style that will be generated
     *
     * @returns the existing class name or a new class name for this style
     */
    protected _getClass(classDef: ITransitionStyle, elem: HTMLElement): string;
    protected _generateRandomClassName(): string;
    /**
     * _createTransitionClass
     * ---------------------------------------------------------------------------
     * Create a CSS class that will be one end of a transition
     *
     * @param   className   Selector to use for the class
     * @param   classDef    Definition for the class
     * @param   elem        Element this class will be applied to
     *
     * @returns The updated CSS class
     */
    protected _createTransitionClass(className: string, classDef: ITransitionStyle, elem: HTMLElement): void;
    /**
     * _replacePlaceholders
     * ----------------------------------------------------------------------------
     * ensure that we replace any placeholders accepted in transition classes with
     * the real measurement
     */
    protected _replacePlaceholders(classDef: ITransitionStyle, elem: HTMLElement): ITransitionStyle;
    /**
     * _createStyleElem
     * ----------------------------------------------------------------------------
     * creates a shared style tag for this class, so that we can continue to add
     * to it
     */
    protected _createStyleElem(): void;
    /**
     * _animate
     * ----------------------------------------------------------------------------
     * add classes in the appropriate timeframe
     */
    protected _animate(details: ITransitionDetails, startName: string, endName: string): Promise<void>;
    /**
     * _removeEndClass
     * ----------------------------------------------------------------------------
     * remove the end-state class
     */
    protected _removeEndClass(elem: HTMLElement, endName: string): Promise<void>;
}
export declare const TransitionController: _TransitionController;
/**
 * transition
 * ---------------------------------------------------------------------------
 * Transition an element to a particular style, then alert the caller that
 * it has completed
 *
 * @param   element     The element to transition
 * @param   startStyle  If needed, any specific new attributes that are needed for this object
 * @param   endStyle    The style we should end up with
 * @param   time        How long this transition should take
 * @param   delay       How long this transition should be delayed
 *
 * @returns Promise that will be called after transition completes
 */
export default function transition(element: HTMLElement, startStyle: ITransitionStyle, endStyle: ITransitionStyle, time: number, delay?: number): Promise<void>;
export interface ITransitionStyle extends TypedClassDefinition {
    shouldRemove?: boolean;
}
interface IPropertyTransition {
    name: string;
    start: any;
    end: any;
    duration: number;
    delay?: number;
}
interface ITransitionDetails {
    elem: HTMLElement;
    start: ITransitionStyle;
    end: ITransitionStyle;
    time: number;
    delay: number;
}
export {};
