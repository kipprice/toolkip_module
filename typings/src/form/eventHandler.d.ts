import { Event } from '../events/event';
import { IEventContext } from "../events/interface";
import { EventHandler } from "../events/eventHandler";
/**
 * Interface for the context needed at form change
 *
 */
export interface IFormElemChangeEventContext<T> extends IEventContext {
    key: string;
    subkey?: string;
    data: T;
}
/**
 * @class	FormElemChangeEvent
 *
 * Registers the form element change event for type safety
 * @author	Kip Price
 * @version	1.0.0
 *
 */
export declare class FormElemChangeEvent<T> extends Event<IFormElemChangeEventContext<T>> {
    protected get _key(): string;
}
/**
 * Interface for the context needed when the savability of the form changes
 *
 */
export interface IFormSavableEventContext extends IEventContext {
    hasErrors?: boolean;
    hasMissingRequired?: boolean;
}
/**
 * @class	FormSavableEvent
 *
 * Registers the event that fires when a form is savable
 * @author	Kip Price
 * @version 1.0.0
 *
 */
export declare class FormSavableEvent extends Event<IEventContext> {
    protected get _key(): string;
}
export declare const FORM_ELEM_CHANGE = "formelemchange";
export declare const FORM_SAVABLE_CHANGE = "formsavablechange";
export interface IFormEventTypes<T> {
    "formelemchange": IFormElemChangeEventContext<T>;
    "formsavablechange": IFormSavableEventContext;
}
/** generate the class that will handle all of the form event handling */
declare class FormEventHandler extends EventHandler<IFormEventTypes<any>> {
}
export declare const formEventHandler: FormEventHandler;
export {};
