"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
function loadFile(fileDetails) {
    return new Promise((resolve, reject) => {
        this._innerLoadFile(fileDetails, resolve, reject);
    });
}
exports.loadFile = loadFile;
/**
 * loadFile
 * ----------------------------------------------------------------------------
 * load a file from a particular URL
 *
 * @param   url         The URL to load a file from
 * @param   success     What to do when the file is loaded successfully
 * @param   error       What do do if the file can't be loaded
 */
function _innerLoadFile(fileDetails, success, error) {
    // kickoff the request to the file
    let request = new XMLHttpRequest();
    request.open('GET', fileDetails.filename);
    // handle the file actually changing status
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            success(request.responseText);
        }
        else if (request.status === 404) {
            error(request.responseText);
        }
    };
    // actually send the appropriate request
    request.send();
}
exports._innerLoadFile = _innerLoadFile;
;
function saveFile(fileDetails) {
    return new Promise((resolve) => {
        _innerSaveFile(fileDetails, resolve);
    });
}
exports.saveFile = saveFile;
function _innerSaveFile({ filename, content }, resolve) {
    let blob;
    // make sure we handle either type of content sent our way
    if (typeof content === "string") {
        blob = new Blob([content], { type: "text/plain" });
    }
    else {
        blob = content;
    }
    // allow the user to download the generated file
    _generateDownload(filename, blob);
}
function _generateDownload(filename, file) {
    // Save the file to the user's machine
    // (taken from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server)
    // handle IE saving
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(file, "u");
    }
    // handle all other browsers
    else {
        let elem = toolkip_create_elements_1.createElement({
            type: "a",
            attr: {
                "href": window.URL.createObjectURL(file),
                "download": filename
            }
        });
        // add the element to the document & simulate a click
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}
