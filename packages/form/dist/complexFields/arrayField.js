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
const _field_1 = require("../_field");
const helpers_1 = require("../helpers");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const arrayChildField_1 = require("./arrayChildField");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
const eventHandler_1 = require("../eventHandler");
const _interfaces_2 = require("./_interfaces");
const _typeguards_1 = require("./_typeguards");
/**----------------------------------------------------------------------------
 * @class ArrayField
 * ----------------------------------------------------------------------------
 * Create an element in the form that can be added to
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class ArrayField extends _collapsibleField_1._CollapsibleField {
    //#endregion
    //..................
    //....................................
    //#region CONSTRUCT THE FORM ELEMENT
    /**
     * ArrayElement
     * ----------------------------------------------------------------------------
     * Generate a form element that can contain lots of copies
     * @param id        Unique identifier for this array element
     * @param template  Details for the overall array
     * @param children
     */
    constructor(id, template, children) {
        super(id, template);
        // copy old template over from an existing element
        if (helpers_1.isField(template)) {
            this._childTemplate = template.childTemplate;
        }
        // otherwise, use the children passed in as our template
        else {
            this._childTemplate = children;
        }
        // create the children array; this will be parsed after elements are created
        this._children = [];
    }
    //.....................
    //#region PROPERTIES
    get _type() { return _interfaces_1.FieldTypeEnum.ARRAY; }
    get _defaultValue() { return []; }
    get _defaultCls() { return "array"; }
    get childTemplate() { return this._childTemplate; }
    /**
     * replacePlaceholder
     * ----------------------------------------------------------------------------
     * update the appropriate theme color for the form
     */
    replacePlaceholder(placeholder, newValue, force) {
        super.replacePlaceholder(placeholder, newValue, force);
        // if there are no children yet, apply to the child template
        // TODO: is this really required? or could we just run applyTheme?
        if (!this._children || this._children.length === 0) {
            if (helpers_1.isField(this._childTemplate)) {
                this._childTemplate.replacePlaceholder(placeholder, newValue, force);
            }
            else {
                toolkip_object_helpers_1.map(this._childTemplate, (child) => {
                    child.replacePlaceholder(placeholder, newValue, force);
                });
            }
        }
        // loop through the children if we have them
        toolkip_object_helpers_1.map(this._children, (child) => {
            child.replacePlaceholder(placeholder, newValue);
        });
    }
    overridePlaceholder(pName, pVal) {
        super.overridePlaceholder(pName, pVal);
        // TODO: pass this along to the appropriate children
    }
    /**
     * _parseFieldTemplate
     * ----------------------------------------------------------------------------
     * Parse the details of our own template
     */
    _parseFieldTemplate(template) {
        super._parseFieldTemplate(template);
        // customize the label to use for the new button
        this._newLabel = template.newLabel || "+ Add New Element";
        // determine whether children can be rearranged
        this._allowReordering = template.allowReordering;
        if (toolkip_shared_types_1.isNullOrUndefined(this._allowReordering)) {
            template.allowReordering = true;
        }
    }
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * create the elements for the array
     */
    _onCreateElements() {
        // show the title
        this._createCollapsibleTitle();
        // handle showing the children
        this._elems.childrenContainer = toolkip_create_elements_1.createElement({ cls: "formChildren", parent: this._elems.base });
        this._createNewButton();
        //this._createStyles();
    }
    /**
     * _createNewButton
     * ----------------------------------------------------------------------------
     * Add the button to create a new entry into our array
     */
    _createNewButton() {
        this._elems.newButton = toolkip_create_elements_1.createElement({
            cls: "arrayChild new",
            content: this._newLabel,
            parent: this._elems.childrenContainer,
            eventListeners: {
                click: () => { this._createNewChild(); }
            }
        });
    }
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * create a cloned version of this element
     */
    _createClonedElement(appendToID) {
        return new ArrayField(this._id + appendToID, this);
    }
    //#endregion
    //....................................
    //........................
    //#region HANDLE CHANGES
    /**
     * _onChange
     * ----------------------------------------------------------------------------
     * array elements are always validated as true
     */
    _getValueFromField() {
        return this._data;
    }
    /**
     * update
     * ----------------------------------------------------------------------------
     * handle when an external force needs to update the form
     */
    update(data, allowEvents) {
        // First clear out the existing data
        this.clear();
        // quit if there's no other data to add
        if (!data) {
            return;
        }
        // recreate the children
        data.map((elem) => {
            let child = this._createNewChild();
            child.update(elem, allowEvents);
        });
    }
    //#endregion
    //........................
    //........................
    //#region HANDLE CHILDREN
    /**
     * _createNewChild
     * ----------------------------------------------------------------------------
     * create a new child element in the array
     */
    _createNewChild() {
        let elem = this._generateChildElement();
        this._addNewChildListeners(elem);
        this._finalizeNewChild(elem);
        return elem;
    }
    /**
     * _generateChildElement
     * ----------------------------------------------------------------------------
     * generate a new child array element
     */
    _generateChildElement() {
        let idx = this._children.length;
        let elem;
        // if this is already an element, just clone it
        if (_typeguards_1.isArrayChildElement(this._childTemplate)) {
            elem = this._cloneFormElement(this._childTemplate, this._id + "|" + idx.toString());
            // otherwise, spin up a new child altogether
        }
        else {
            elem = new arrayChildField_1.ArrayChildField(this._id + "|" + idx.toString(), this._childTemplate, { allowReordering: this._allowReordering });
        }
        return elem;
    }
    /**
     * _finalizeNewChild
     * ----------------------------------------------------------------------------
     * add the created child to our style map and our children
     */
    _finalizeNewChild(elem) {
        this._applyThemes(elem);
        this._children.push(elem);
        toolkip_html_helpers_1.removeElement(this._elems.newButton);
        elem.draw(this._elems.childrenContainer);
        this._elems.childrenContainer.appendChild(this._elems.newButton);
        window.setTimeout(() => { elem.focus(); }, 300);
    }
    /**
     * _addNewChildListeners
     * ----------------------------------------------------------------------------
     * make sure the child has the appropriate listeners
     */
    _addNewChildListeners(child) {
        // handle when the child is rearranged in the order
        child.addOrderingListener(this);
        // handle the child updating
        eventHandler_1.formEventHandler.addEventListener(eventHandler_1.FORM_ELEM_CHANGE, {
            func: (event) => {
                let key = event.context.key;
                if (key !== child.id) {
                    return;
                }
                window.setTimeout(() => {
                    this._updateInternalData(true);
                    this._dispatchChangeEvent(child.id);
                }, 0);
            },
            uniqueId: this.id + "|" + child.id,
            target: child
        });
    }
    /**
     * _updateInternalData
     * ----------------------------------------------------------------------------
     * Make sure we are aware of the contents of our children
     */
    _updateInternalData(internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            let cnt = 0;
            let p = [];
            for (let elem of this._children) {
                p.push(this._updateInternalField(elem, data, internalOnly));
            }
            yield Promise.all(p);
            return data;
        });
    }
    _updateInternalField(elem, data, internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            if (toolkip_shared_types_1.isNullOrUndefined(elem)) {
                return Promise.resolve();
            }
            let childData = yield elem.save(internalOnly);
            if (toolkip_shared_types_1.isNullOrUndefined(childData)) {
                return Promise.resolve();
            }
            data.push(childData);
        });
    }
    //#endregion
    //...............................................................
    //#region OVERRIDE STANDARD FUNCTIONS THAT NEED CUSTOM LOGIC
    /**
    * save
    * ----------------------------------------------------------------------------
    * Handle saving the section
    * @param   internalOnly    If true, doesn't do all the updating that would
    *                          happen on a real save
    *
    * @returns The data contained in this sections child elements
    */
    save(internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            // save all of the child elements
            this._data = yield this._updateInternalData(internalOnly);
            // return the data that was created
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
    /**
     * _onClear
     * ----------------------------------------------------------------------------
     * handle clearing out the array
     */
    clear() {
        this._elems.childrenContainer.innerHTML = "";
        this._children = [];
    }
    /**
     * onChangeOrder
     * ----------------------------------------------------------------------------
     * Make sure we respect the new order of these
     */
    onChangeOrder(child, direction, moveTo) {
        // update data array
        let curIdx;
        for (let i = 0; i < this._children.length; i += 1) {
            if (this._children[i] === child) {
                curIdx = i;
            }
        }
        let nextIdx = toolkip_shared_types_1.isNullOrUndefined(moveTo) ? curIdx + direction : moveTo;
        if (nextIdx < 0) {
            nextIdx = 0;
        }
        if (nextIdx >= this._children.length) {
            nextIdx = this._children.length - 1;
        }
        this._children.splice(curIdx, 1);
        this._children.splice(nextIdx, 0, child);
        // update UI array
        let childElem = this._elems.childrenContainer.children[curIdx];
        let nextSibling = this._elems.childrenContainer.children[nextIdx + (direction === _interfaces_2.DirectionType.FORWARD ? 1 : 0)];
        this._elems.childrenContainer.removeChild(childElem);
        if (nextSibling) {
            this._elems.childrenContainer.insertBefore(childElem, nextSibling);
        }
        else {
            this._elems.childrenContainer.appendChild(childElem);
        }
    }
    /**
     * focus
     * ----------------------------------------------------------------------------
     * Give focus to the first field in our first child element
     */
    focus() {
        if (!this._children) {
            return false;
        }
        for (let child of this._children) {
            if (!child) {
                continue;
            }
            if (child.focus()) {
                return true;
            }
        }
        return false;
    }
    //#endregion
    //...............................................................
    //..........................................
    //#region GET ELEMENTS AFTER CREATION
    getField(id) {
        // first check this element
        if (id === this._id) {
            return this;
        }
        // then check child elements
        let result;
        for (let c of this._children) {
            if (result) {
                break;
            }
            result = c.getField(id);
        }
        return result;
    }
}
exports.ArrayField = ArrayField;
//#endregion
//.....................
//..................
//#region STYLES
ArrayField._uncoloredStyles = {
    ".kipFormElem.array": {
        nested: {
            "> .formChildren": {
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridColumnGap: "10px",
                gridRowGap: "10px"
            },
            ".array .formChildren": {
                gridTemplateColumns: "100%"
            },
            "&.collapsed": {
                nested: {
                    ".kipBtn.new": {
                        display: "none"
                    }
                }
            },
            ".arrayChild.new": {
                border: "1px dashed <formSubTheme>",
                cursor: "pointer",
                opacity: "0.5",
                backgroundColor: "#FFF",
                fontSize: "1.3em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "<formSubTheme>",
                userSelect: "none",
                webkitUserSelect: "none",
                mozUserSelect: "none",
                msUserSelect: "none",
                nested: {
                    ".mobile &": {
                        width: "calc(100% - 20px)"
                    },
                    "&:hover": {
                        opacity: "1"
                    }
                }
            }
        }
    }
};
ArrayField._styleDependencies = [_field_1._Field, _collapsibleField_1._CollapsibleField];
