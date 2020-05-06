"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberField_1 = require("./numberField");
const _interfaces_1 = require("../_interfaces");
const _field_1 = require("../_field");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
/**---------------------------------------------------------------------------
 * @class 	PercentageField
 * ---------------------------------------------------------------------------
 * Show a numeric form specific to percentages. Only differs from a numeric
 * element in the display
 *
 * @author  Kip Price
 * @version 1.0.0
 * ---------------------------------------------------------------------------
 */
class PercentageField extends numberField_1.NumberField {
    //.....................
    //#region PROPERTIES
    get _type() { return _interfaces_1.FieldTypeEnum.PERCENTAGE; }
    get _defaultValue() { return 0; }
    get _defaultCls() { return "percentage"; }
    //#endregion
    //...................................................
    _createElements() {
        super._createElements();
        // create the element that indicates this expects a percentage
        toolkip_create_elements_1.createElement({
            cls: "percentageLbl",
            content: "%",
            parent: this._elems.base
        });
    }
    /**
     * _createClonedElement
     * ---------------------------------------------------------------------------
     * create a new percentage element as required
     */
    _createClonedElement(appendToID) {
        return new PercentageField(this._id + appendToID, this);
    }
}
exports.PercentageField = PercentageField;
//#endregion
//.....................
//...................................................
//#region STYLES
PercentageField._uncoloredStyles = {
    ".percentage": {
        nested: {
            "input": {
                maxWidth: "3em"
            },
            ".percentageLbl": {
                color: "#555",
                fontSize: "1em",
                marginLeft: "5px",
                display: "inline-block"
            }
        }
    }
};
PercentageField._styleDependencies = [_field_1._Field];
