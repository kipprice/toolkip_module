import { format } from "../primitiveHelpers/strings";
import { map } from "./manipulate";

/**
 * stringify
 * ----------------------------------------------------------------------------
 * turn a JSON object into a string version
 */
export function stringify(obj: any, asHtml: boolean, prefix?: string): string {
    let out: string[] = [];
    let newLineChar = asHtml ? "<br>" : "\n";
    let tabChar = asHtml ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "\t";
    if (!prefix) { prefix = ""; }

    map(obj, (value: any, key: string) => {
        let valStr: string;
        switch (typeof value) {

            case "string":
                valStr = value;
                break;

            case "number":
            case "boolean":
                valStr = value.toString();
                break;

            default:
                if (!value) {
                    valStr = value as string;
                    break;
                }

                if (value.hasOwnProperty("toString")) {
                    valStr = newLineChar + value.toString();
                } else {
                    valStr = newLineChar + stringify(value, asHtml, tabChar);
                }
        }

        out.push(_format(prefix + key, valStr, asHtml));
    })

    return out.join("");
}

/**
 * _format
 * ----------------------------------------------------------------------------
 * format a particular property appropriately
 */
function _format(key: string, value: string, asHtml: boolean): string {
    if (asHtml) { return _formatPropertyAsHTML(key, value); }
    return _formatPropertyAsPlainText(key, value);
}

/**
 * _formatPropertyAsHTML
 * ----------------------------------------------------------------------------
 * show a property as HTML
 */
function _formatPropertyAsHTML(key: string, value: string): string {
    return format(
        "<b>{0}</b>: {1}{2}",
        key,
        value,
        "<br>"
    );
}

/**
 * _formatPropertyAsPlainText
 * ----------------------------------------------------------------------------
 * show a JSON property as string
 */
function _formatPropertyAsPlainText(key: string, value: string): string {
    return format(
        "{0}: {1}\n",
        key,
        value
    );
}