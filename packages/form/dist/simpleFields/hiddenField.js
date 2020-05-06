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
const _field_1 = require("../_field");
const _interfaces_1 = require("../_interfaces");
/**----------------------------------------------------------------------------
 * @class HiddenField
 * ----------------------------------------------------------------------------
 * handle a data element that will be set, but not displayed to the user
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class HiddenField extends _field_1._Field {
    get _type() { return _interfaces_1.FieldTypeEnum.HIDDEN; }
    get _defaultCls() { return "hidden"; }
    get _defaultValue() { return null; }
    _onCreateElements() { }
    _getValueFromField() {
        return this._data;
    }
    _createClonedElement(appendToID) {
        return new HiddenField(this.id + appendToID, this);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._data;
        });
    }
}
exports.HiddenField = HiddenField;
HiddenField._uncoloredStyles = {
    "kipFormElem.hidden": {
        display: "none"
    }
};
