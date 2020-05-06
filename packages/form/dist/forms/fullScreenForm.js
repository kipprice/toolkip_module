"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _form_1 = require("./_form");
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
class FullScreenForm extends _form_1._Form {
    //#endregion
    //..................
    //..........................................
    //#region CREATE ELEMENTS
    _createBase() {
        let out = super._createBase();
        toolkip_style_helpers_1.addClass(out, "fullscreen");
        return out;
    }
}
exports.FullScreenForm = FullScreenForm;
//..................
//#region STYLES
FullScreenForm._uncoloredStyles = {
    ".kipForm.fullscreen": {
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "<formBackgroundTheme>",
        nested: {
            ".background": {
                maxWidth: "1000px",
                backgroundColor: "#FFF",
                height: "100%",
                padding: "15px",
                boxSizing: "border-box"
            },
            ".sectionHeaderContainer": {
                justifyContent: "center",
                nested: {
                    ".sectionHeader": {
                        textAlign: "center"
                    },
                    ".caret": {
                        marginLeft: "5px"
                    }
                }
            }
        }
    }
};
FullScreenForm._styleDependencies = [_form_1._Form];
