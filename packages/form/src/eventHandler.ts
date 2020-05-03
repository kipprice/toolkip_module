import { _Event } from '@kipprice/toolkip-events/event';
import { IEventContext } from '@kipprice/toolkip-events/_interfaces";
import { _EventHandler } from '@kipprice/toolkip-events/eventHandler";


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
export class FormElemChangeEvent<T> extends _Event<IFormElemChangeEventContext<T>> {
	protected get _key(): string { return FORM_ELEM_CHANGE; }
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
export class FormSavableEvent extends _Event<IEventContext> {
	protected get _key(): string { return FORM_SAVABLE_CHANGE; }
}

//.................................
//#region EVENT HANDLER FOR FORMS

// create a particular event for all form change events
export const FORM_ELEM_CHANGE = "formelemchange";
export const FORM_SAVABLE_CHANGE = "formsavablechange";

//#endregion
//.................................

// track all of the types of events that forms support
export interface IFormEventTypes<T> {
	"formelemchange": IFormElemChangeEventContext<T>;
	"formsavablechange": IFormSavableEventContext;
}

/** generate the class that will handle all of the form event handling */
class FormEventHandler extends _EventHandler<IFormEventTypes<any>> { }
export const formEventHandler = new FormEventHandler();

formEventHandler.createEvent(FORM_ELEM_CHANGE, "Form Element Changed");
formEventHandler.createEvent(FORM_SAVABLE_CHANGE, "Form Savable Change");

