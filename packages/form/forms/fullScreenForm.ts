import { _Form } from "./_form";
import { IStandardStyles } from "../../styleHelpers/_interfaces";
import { addClass } from "../../styleHelpers/css";


export class FullScreenForm<T> extends _Form<T> {

    //..................
    //#region STYLES

    protected static _uncoloredStyles: IStandardStyles = {
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
    }

    protected static _styleDependencies = [_Form];

    //#endregion
    //..................

    //..........................................
    //#region CREATE ELEMENTS

    protected _createBase() {
        let out = super._createBase();
        addClass(out, "fullscreen");
        return out;
    }

    //#endregion
    //..........................................
}
