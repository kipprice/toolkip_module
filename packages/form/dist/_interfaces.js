"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//...............
//#region ENUMS
/** type of the element */
var FieldTypeEnum;
(function (FieldTypeEnum) {
    FieldTypeEnum[FieldTypeEnum["TEXT"] = 1] = "TEXT";
    FieldTypeEnum[FieldTypeEnum["NUMBER"] = 2] = "NUMBER";
    FieldTypeEnum[FieldTypeEnum["DATE"] = 3] = "DATE";
    FieldTypeEnum[FieldTypeEnum["TIME"] = 4] = "TIME";
    FieldTypeEnum[FieldTypeEnum["DATE_TIME"] = 5] = "DATE_TIME";
    FieldTypeEnum[FieldTypeEnum["SELECT"] = 6] = "SELECT";
    FieldTypeEnum[FieldTypeEnum["CHECKBOX"] = 7] = "CHECKBOX";
    FieldTypeEnum[FieldTypeEnum["TEXTAREA"] = 8] = "TEXTAREA";
    FieldTypeEnum[FieldTypeEnum["ARRAY"] = 9] = "ARRAY";
    FieldTypeEnum[FieldTypeEnum["ARRAY_CHILD"] = 10] = "ARRAY_CHILD";
    FieldTypeEnum[FieldTypeEnum["TOGGLE_BUTTON"] = 11] = "TOGGLE_BUTTON";
    FieldTypeEnum[FieldTypeEnum["CUSTOM"] = 12] = "CUSTOM";
    FieldTypeEnum[FieldTypeEnum["SECTION"] = 13] = "SECTION";
    FieldTypeEnum[FieldTypeEnum["HIDDEN"] = 14] = "HIDDEN";
    FieldTypeEnum[FieldTypeEnum["FILE_UPLOAD"] = 15] = "FILE_UPLOAD";
    FieldTypeEnum[FieldTypeEnum["FILE_PATH"] = 16] = "FILE_PATH";
    FieldTypeEnum[FieldTypeEnum["COLOR"] = 17] = "COLOR";
    FieldTypeEnum[FieldTypeEnum["PERCENTAGE"] = 18] = "PERCENTAGE";
    FieldTypeEnum[FieldTypeEnum["PASSWORD"] = 19] = "PASSWORD";
})(FieldTypeEnum = exports.FieldTypeEnum || (exports.FieldTypeEnum = {}));
;
var ValidationType;
(function (ValidationType) {
    ValidationType[ValidationType["KEEP_ERROR_VALUE"] = 1] = "KEEP_ERROR_VALUE";
    ValidationType[ValidationType["RESTORE_OLD_VALUE"] = 2] = "RESTORE_OLD_VALUE";
    ValidationType[ValidationType["CLEAR_ERROR_VALUE"] = 3] = "CLEAR_ERROR_VALUE";
    ValidationType[ValidationType["NO_BLUR_PROCESSED"] = 4] = "NO_BLUR_PROCESSED";
})(ValidationType = exports.ValidationType || (exports.ValidationType = {}));
/** options for layout */
var FormElementLayoutEnum;
(function (FormElementLayoutEnum) {
    FormElementLayoutEnum[FormElementLayoutEnum["MULTILINE"] = 0] = "MULTILINE";
    FormElementLayoutEnum[FormElementLayoutEnum["TABLE"] = 1] = "TABLE";
    FormElementLayoutEnum[FormElementLayoutEnum["FLEX"] = 2] = "FLEX";
    FormElementLayoutEnum[FormElementLayoutEnum["LABEL_AFTER"] = 3] = "LABEL_AFTER";
})(FormElementLayoutEnum = exports.FormElementLayoutEnum || (exports.FormElementLayoutEnum = {}));
;
var FormStyleOptions;
(function (FormStyleOptions) {
    FormStyleOptions[FormStyleOptions["EMBEDDED"] = 1] = "EMBEDDED";
    FormStyleOptions[FormStyleOptions["POPUP"] = 2] = "POPUP";
    FormStyleOptions[FormStyleOptions["INLINE"] = 3] = "INLINE";
    FormStyleOptions[FormStyleOptions["FULLSCREEN"] = 4] = "FULLSCREEN";
})(FormStyleOptions = exports.FormStyleOptions || (exports.FormStyleOptions = {}));
//#endregion
//..........................................
