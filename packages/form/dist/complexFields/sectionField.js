"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../_interfaces");
const _collapsibleField_1 = require("./_collapsibleField");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const _field_1 = require("../_field");
const helpers_1 = require("../helpers");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const eventHandler_1 = require("../eventHandler");
/**----------------------------------------------------------------------------
 * @class SectionField
 * ----------------------------------------------------------------------------
 * create an element in the form that will contain other elements of a form
 * @author  Kip Price
 * @version 1.0.2
 * ----------------------------------------------------------------------------
 */
class SectionField extends _collapsibleField_1._CollapsibleField {
    //#endregion
    //.....................
    //.......................................
    //#region CONSTRUCT AND CREATE ELEMENTS
    /**
     * SectionElement
     * ----------------------------------------------------------------------------
     * create a section element
     * @param   id          Unique identifier for the section
     * @param   config      Template for the section itself
     * @param   children    All child elements of this section
     */
    constructor(id, config, children) {
        super(id, config);
        // grab children from the parent element if appropriate
        if (helpers_1.isField(config)) {
            children = config.children;
        }
        this._parseChildren(children);
    }
    /**
     * replacePlaceholder
     * ----------------------------------------------------------------------------
     * update the appropriate theme color for the form
     */
    replacePlaceholder(uniqueId, color, force) {
        super.replacePlaceholder(uniqueId, color, force);
        if (!this._children) {
            return;
        }
        if (helpers_1.isField(this._children)) {
            this._children.replacePlaceholder(uniqueId, color, force);
        }
        else {
            toolkip_object_helpers_1.map(this._children, (child) => {
                child.replacePlaceholder(uniqueId, color, force);
            });
        }
    }
    overridePlaceholder(pName, pVal) {
        super.overridePlaceholder(pName, pVal);
        // TODO: pass this along to the appropriate children
    }
    get children() { return this._children; }
    /** handle the defaults that all form elements need */
    get _defaultCls() { return "kipFormElem section"; }
    get _defaultValue() { return {}; }
    /** use a section type */
    get _type() { return _interfaces_1.FieldTypeEnum.SECTION; }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * create elements for the section
     */
    _onCreateElements() {
        // Create the title for the section
        this._createCollapsibleTitle();
        // Create the form children section
        this._elems.childrenContainer = toolkip_create_elements_1.createSimpleElement("", "formChildren", "", null, null, this._elems.base);
        // this._createStyles();
        this._updateClsBasedOnLayout();
    }
    /** create a clone of this element */
    _createClonedElement(appendToID) {
        return new SectionField(this._id + appendToID, this);
    }
    //#endregion
    //.......................................
    //..........................................
    //#region PARSE THE CHILDREN OF A SECTION
    /**
     * _parseChildren
     * ----------------------------------------------------------------------------
     * parse the children array of this form element
     * @param   children    The children for this section
     */
    _parseChildren(children) {
        // quit if there isn't any data
        if (!children) {
            children = {};
            return;
        }
        // Handle when there is just a single element inside of this section
        if (helpers_1.isField(children)) {
            let elem = this._parseChild(children);
            this._children = elem;
            return;
            // handle when there is a list of children
        }
        else {
            this._children = {};
            // go through each of the children
            toolkip_object_helpers_1.map(children, (template, key) => {
                let elem = this._parseChild(template);
                this._children[key] = elem;
            });
        }
    }
    /**
     * parseChild
     * ----------------------------------------------------------------------------
     * Go through our children array and create the individual children
     * @param   child   The element to parse
     */
    _parseChild(child) {
        let elem = this._cloneFormElement(child);
        this._applyThemes(elem);
        elem.draw(this._elems.childrenContainer);
        eventHandler_1.formEventHandler.addEventListener(eventHandler_1.FORM_ELEM_CHANGE, {
            func: (event) => {
                let key = event.context.key;
                if (key !== elem.id) {
                    return;
                }
                window.setTimeout(() => {
                    this._updateInternalData(true);
                    this._dispatchChangeEvent(elem.id);
                }, 0);
            },
            target: elem,
            uniqueId: this._id + "|" + elem.id
        });
        return elem;
    }
    /**
     * _updateInternalData
     * ----------------------------------------------------------------------------
     * Handle keeping our internal data tracking up to date with our children
     * @param   internalOnly    If true, indicates that we aren't doing a full save
     */
    _updateInternalData(internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            let elem;
            let data;
            if (helpers_1.isField(this._children)) {
                data = yield this._children.save(internalOnly);
            }
            else {
                data = {};
                let promises = toolkip_object_helpers_1.map(this._children, (elem, key) => __awaiter(this, void 0, void 0, function* () {
                    return this._updateInternalField(key, elem, data, internalOnly);
                }));
                yield Promise.all(promises);
            }
            return data;
        });
    }
    _updateInternalField(key, elem, data, internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            data[key] = yield elem.save(internalOnly);
            return Promise.resolve();
        });
    }
    //#endregion
    //..........................................
    //................................................
    //#region OVERRIDE SPECIAL BEHAVIOR FOR SECTIONS
    /**
     * save
     * ----------------------------------------------------------------------------
     * Handle saving the section
     *
     * @param   internalOnly    If true, doesn't do all the updating that would
     *                          happen on a real save
     *
     * @returns The data contained in this sections child elements
     */
    save(internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            // save all of the child elements
            this._data = yield this._updateInternalData(internalOnly);
            return this._data;
        });
    }
    /**
     * canSave
     * ----------------------------------------------------------------------------
     * Determine whether this element can save, based on whether its children
     * have errors.
     *
     * @returns True if we can save this element
     */
    canSave() {
        // if we only have a single child, check that one
        if (helpers_1.isField(this._children)) {
            return this._children.canSave();
            // otherwise, check all of our children
        }
        else {
            let canSave = {
                hasErrors: false,
                hasMissingRequired: false
            };
            toolkip_object_helpers_1.map(this._children, (child) => {
                let childCanSave = child.canSave();
                canSave.hasErrors = canSave.hasErrors || childCanSave.hasErrors;
                canSave.hasMissingRequired = canSave.hasMissingRequired || childCanSave.hasMissingRequired;
            }, () => { return canSave.hasErrors && canSave.hasMissingRequired; });
            return canSave;
        }
    }
    /**
     * clear
     * ----------------------------------------------------------------------------
     * Clear out all child elements when clearing the section
     */
    clear() {
        if (helpers_1.isField(this._children)) {
            this._children.clear();
        }
        else {
            toolkip_object_helpers_1.map(this._children, (elem, key) => {
                elem.clear();
            });
        }
    }
    /**
     * focus
     * ----------------------------------------------------------------------------
     * Allow the first child of this section to take focus
     */
    focus() {
        if (!this._children) {
            return false;
        }
        if (helpers_1.isField(this._children)) {
            return this._children.focus();
        }
        else {
            let isFocused;
            toolkip_object_helpers_1.map(this._children, (value, key) => {
                if (value.focus()) {
                    isFocused = true;
                }
            }, () => { return isFocused; });
            return isFocused;
        }
    }
    //#endregion
    //................................................
    //........................
    //#region HANDLE CHANGES
    /**
     * update
     * ----------------------------------------------------------------------------
     * update the inter contents of the form
     * @param   data    The new data for this element
     */
    update(data, allowEvents) {
        if (!data) {
            return;
        }
        if (helpers_1.isField(this._children)) {
            this._children.update(data, allowEvents), allowEvents;
        }
        else {
            toolkip_object_helpers_1.map(this._children, (elem, key) => {
                elem.update(data[key], allowEvents);
            });
        }
    }
    /**
     * _getValueFromField
     * ----------------------------------------------------------------------------
     * return standard value
     */
    _getValueFromField() {
        return this._data;
    }
    /**
     * _validate
     * ----------------------------------------------------------------------------
     * no validation for section elements
     */
    _validate(data) {
        return true;
    }
    //#endregion   
    //........................
    //.............................................
    //#region DYNAMICALLY ADD FIELDS TO THIS FORM
    addChildElement(key, formElem) {
        // if this section doesn't actually have keyed children, we can't do anything
        if (helpers_1.isField(this._children)) {
            return false;
        }
        // add to the children's array and to the UI
        if (!this._children) {
            this._children = {};
        }
        this._children[key] = this._parseChild(formElem);
        return true;
    }
    _updateClsBasedOnLayout() {
        let cls;
        switch (this._config.layout) {
            case _interfaces_1.FormElementLayoutEnum.FLEX:
                cls = "flex";
                break;
            case _interfaces_1.FormElementLayoutEnum.TABLE:
                cls = "table";
                break;
            case _interfaces_1.FormElementLayoutEnum.LABEL_AFTER:
            case _interfaces_1.FormElementLayoutEnum.MULTILINE:
            default:
                cls = "multiline";
                break;
        }
        toolkip_style_helpers_1.addClass(this._elems.childrenContainer, cls);
    }
    //#endregion
    //.............................................
    //..........................................
    //#region GET ELEMENTS AFTER CREATION
    getField(id) {
        // first check this element
        if (id === this._id) {
            return this;
        }
        // then check child elements
        if (helpers_1.isField(this._children)) {
            return this._children.getField(id);
        }
        else {
            let result;
            toolkip_object_helpers_1.map(this._children, (child) => {
                if (result) {
                    return;
                }
                result = child.getField(id);
            }, () => { return !!result; });
            return result;
        }
    }
}
exports.SectionField = SectionField;
//.................
//#region STYLES
/** styles to display this section correctly */
SectionField._uncoloredStyles = {
    ".kipFormElem.section": {
        marginTop: "10px",
        marginBottom: "5px"
    },
    ".kipFormElem .sectionHeader": {
        fontFamily: "OpenSansBold,Segoe UI,Helvetica",
        fontSize: "1.5em",
        color: "<formTheme>",
        fontWeight: "bold",
    },
    ".kipFormElem .section .sectionHeader, .kipFormElem .array .sectionHeader": {
        fontSize: "1.2em",
        color: "<formSubTheme>"
    },
    ".kipFormElem.section > .formChildren .section.collapsible > .formChildren": {
        borderLeft: "1px solid <formTheme>",
        paddingLeft: "20px"
    },
    ".kipFormElem.section > .formChildren .section > .sectionHeaderContainer.hidden + .formChildren": {
        borderLeft: "0 solid",
        paddingLeft: "0"
    },
    ".kipFormElem.section > .formChildren.flex": {
        display: "flex",
        alignItems: "center",
        marginLeft: "0",
        nested: {
            "> .kipFormElem": {
                width: "auto"
            },
        }
    }
};
/** section elements are a merged set of themes */
SectionField._styleDependencies = [
    _field_1._Field,
    _collapsibleField_1._CollapsibleField
];
