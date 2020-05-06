"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_events_1 = require("@kipprice/toolkip-events");
/**
 * @class	FormElemChangeEvent
 *
 * Registers the form element change event for type safety
 * @author	Kip Price
 * @version	1.0.0
 *
 */
class FormElemChangeEvent extends toolkip_events_1._Event {
    get _key() { return exports.FORM_ELEM_CHANGE; }
}
exports.FormElemChangeEvent = FormElemChangeEvent;
/**
 * @class	FormSavableEvent
 *
 * Registers the event that fires when a form is savable
 * @author	Kip Price
 * @version 1.0.0
 *
 */
class FormSavableEvent extends toolkip_events_1._Event {
    get _key() { return exports.FORM_SAVABLE_CHANGE; }
}
exports.FormSavableEvent = FormSavableEvent;
//.................................
//#region EVENT HANDLER FOR FORMS
// create a particular event for all form change events
exports.FORM_ELEM_CHANGE = "formelemchange";
exports.FORM_SAVABLE_CHANGE = "formsavablechange";
/** generate the class that will handle all of the form event handling */
class FormEventHandler extends toolkip_events_1._EventHandler {
}
exports.formEventHandler = new FormEventHandler();
exports.formEventHandler.createEvent(exports.FORM_ELEM_CHANGE, "Form Element Changed");
exports.formEventHandler.createEvent(exports.FORM_SAVABLE_CHANGE, "Form Savable Change");
