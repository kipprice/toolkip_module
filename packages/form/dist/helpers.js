"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_primitive_helpers_1 = require("@kipprice/toolkip-primitive-helpers");
function cloneTemplate(template) {
    let temp = {
        value: template.value,
        position: template.position,
        required: template.required,
        onValidate: template.onValidate,
        onOtherChange: template.onOtherChange,
        label: template.label,
        cls: template.cls,
        layout: template.layout
    };
    return temp;
}
exports.cloneTemplate = cloneTemplate;
/**
 * createSelectElement
 * ----------------------------------------------------------------------------
 * Creates a select element with associated options
 * @param id - ID to use for the select element
 * @param cls - the CSS class to use to style this select box
 * @param options - What options should be included in the select box
 * @param defaultSelection - What should be selected by default
 *
 * @version 1.0.2
 */
function createSelectElement(id, cls, options, defaultSelection) {
    // turn the option array into something the createElement function will understand
    let optionElems = createSelectOptions(options, defaultSelection);
    // if there's no default, set the default to be -1
    if (toolkip_shared_types_1.isNullOrUndefined(defaultSelection)) {
        defaultSelection = -1;
    }
    // create the general definition for the select element
    let select = toolkip_create_elements_1.createElement({
        id: id,
        cls: cls,
        type: "select",
        children: optionElems
    });
    if (!toolkip_shared_types_1.isNullOrUndefined(defaultSelection)) {
        select.value = defaultSelection.toString();
    }
    // return the created select box
    return select;
}
exports.createSelectElement = createSelectElement;
/**
 * createSelectOptions
 * ----------------------------------------------------------------------------
 * create options that will sit in a select element
 */
function createSelectOptions(options, defaultSelection) {
    let optElems = [];
    // if there's no default, add a default blank option before anything else
    if (toolkip_shared_types_1.isNullOrUndefined(defaultSelection)) {
        let def = _createSelectOption("-- select an option --", -1, true);
        def.attr.disabled = "true";
        optElems.push(toolkip_create_elements_1.createElement(def));
    }
    toolkip_object_helpers_1.map(options, (lbl, value) => {
        let def = _createSelectOption(lbl, value, value === defaultSelection);
        optElems.push(toolkip_create_elements_1.createElement(def));
    });
    return optElems;
}
exports.createSelectOptions = createSelectOptions;
/**
 * _createSelectOption
 * ----------------------------------------------------------------------------
 * Create a single select option
 *
 * @param   label       Label to show for the option
 * @param   value       Value the option is linked to
 * @param   isDefault   True if the option should be selected by default
 *
 * @returns The definition that will create this option
 */
function _createSelectOption(label, value, isDefault) {
    let def = {
        type: "option",
        attr: {
            value: value
        },
        content: label
    };
    if (isDefault) {
        def.attr.selected = "true";
    }
    return def;
}
;
/**
 * Creates a checkbox element & a wrapper around it
 * @param id - ID to use for the checkbox
 * @param cls - the CSS class to style this checkbox
 * @param lbl - What label to use for this checkbox
 * @param checked - True if the checkbox should be checked
 */
function createLabeledCheckbox(id, cls, lbl, checked) {
    // create the wrapper to hold the checkbox + label
    let wrapperElem = toolkip_create_elements_1.createSimpleElement(id + "|wrapper", cls + "|wrapper");
    // create the checkbox itself
    let checkboxDef = {
        type: "input",
        id: id,
        cls: cls,
        attr: {
            type: "checkbox",
            checked: checked.toString(),
            name: id
        },
        parent: wrapperElem
    };
    let checkboxElem = toolkip_create_elements_1.createElement(checkboxDef);
    // create the label for the checkbox
    let lblElem = toolkip_create_elements_1.createSimpleElement("", cls + "|lbl", lbl, { for: id }, null, wrapperElem);
    // return the wrapper + the checkbox
    return {
        wrapper: wrapperElem,
        checkbox: checkboxElem
    };
}
exports.createLabeledCheckbox = createLabeledCheckbox;
/** creates a label that will be clickable to select an associated input */
function createLabelForInput(lbl, labelFor, cls, embedIn, attr) {
    if (!attr) {
        attr = {};
    }
    attr.for = labelFor;
    let lblElement = toolkip_create_elements_1.createElement({
        type: "label",
        cls: cls,
        attr: attr,
        content: lbl,
        parent: embedIn
    });
    return lblElement;
}
exports.createLabelForInput = createLabelForInput;
function createRadioButtons() {
    //TODO: IMPLEMENT
}
exports.createRadioButtons = createRadioButtons;
/**
 * Create an input element
 * @param id
 * @param cls
 * @param type
 * @param value
 * @param attr
 * @param children
 * @param parent
 */
function createInputElement(id, cls, type, value, attr, children, parent) {
    let elemType = "input";
    // handle the type
    type = type.toLowerCase();
    if (type === "textarea") {
        type = "";
        elemType = "textarea";
    }
    // update the attribute array
    attr = attr || {};
    attr.type = type;
    if (value) {
        if (type === "checkbox" || type === "radio") {
            attr.checked = value;
        }
        else if (type === "date") {
            attr.value = toolkip_primitive_helpers_1.inputDateFmt(value);
        }
        else {
            attr.value = value;
        }
    }
    // create the appropriate element
    let elem = toolkip_create_elements_1.createElement({
        type: elemType,
        id: id,
        cls: cls,
        attr: attr,
        children: children,
        parent: parent
    });
    // return the element
    return elem;
}
exports.createInputElement = createInputElement;
/**
 * isField
 * ----------------------------------------------------------------------------
 * determine whether a particular parameter is a form element
 * @param elem - Either a FormElement or a FormTemplate
 * @returns True if elem is a form Element
 */
function isField(elem) {
    if (!elem) {
        return false;
    }
    return (elem.id !== undefined) &&
        (elem.type !== undefined) &&
        (elem.template !== undefined);
}
exports.isField = isField;
