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
const filePathField_1 = require("./filePathField");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_shared_types_1 = require("@kipprice/toolkip-shared-types");
const helpers_1 = require("../helpers");
/**----------------------------------------------------------------------------
* @class PhotoPathField
* ----------------------------------------------------------------------------
* create an element to upload photos
* @author  Kip Price
* @version 1.0.0
* ----------------------------------------------------------------------------
*/
class PhotoPathField extends filePathField_1.FilePathField {
    //#endregion
    //..................
    //.....................
    //#region PROPERTIES
    /** default class for this element */
    get _defaultCls() { return "photopath"; }
    //#endregion
    //.....................
    //..........................................
    //#region CREATE ELEMENTS FOR PHOTO UPLOAD
    /**
     * _onCreateElements
     * ----------------------------------------------------------------------------
     * Handle creating elements for the form element
     */
    _onCreateElements() {
        this._elems.photoWrapper = toolkip_create_elements_1.createSimpleElement("", "photoWrapper", "", null, null, this._elems.base);
        this._elems.display = toolkip_create_elements_1.createElement({
            type: "img",
            cls: "photo",
            attr: { "src": this._data },
            parent: this._elems.photoWrapper
        });
        // draw the photo element
        this._elems.overlay = toolkip_create_elements_1.createSimpleElement("", "photoOverlay", "", null, null, this._elems.photoWrapper);
        // handle setting a manual link
        this._elems.linkBtn = toolkip_create_elements_1.createSimpleElement("", "photoBtn link", "CHANGE LINK", null, null, this._elems.overlay);
        this._elems.linkBtn.addEventListener("click", () => {
            let linkURL = window.prompt("What should the link be set to?", this._data);
            // no change or cancel: don't continue
            if (linkURL === this._data) {
                return;
            }
            if (toolkip_shared_types_1.isNullOrUndefined(linkURL)) {
                return;
            }
            // otherwise save off the link and use it in our change function
            this._tempLink = linkURL;
            this._changeEventFired();
        });
        // Draw the option for file upload
        this._elems.input = helpers_1.createInputElement(this._id + "|input", "photoInput", "file", "", null, null, this._elems.overlay);
        this._elems.uploadBtn = helpers_1.createLabelForInput("UPLOAD", this._id + "|input", "photoBtn upload", this._elems.overlay);
        this._elems.input.addEventListener("change", () => {
            this._changeEventFired();
            this._onFileSelected();
        });
    }
    //#endregion
    //..........................................
    /**
     * _createClonedElement
     * ----------------------------------------------------------------------------
     * Handle cloning this element
     * @param   appendToID  If provided, the ID to append to this element
     * @returns The created cloned element
     */
    _createClonedElement(appendToID) {
        return new PhotoPathField(this.id + appendToID, this._config);
    }
    /**
     * update
     * ----------------------------------------------------------------------------
     * Update the data within this form
     * @param   data    The details to update this element with
     */
    update(data, allowEvents) {
        this._files = null;
        if (!data) {
            data = "";
        }
        this._data = data;
        this._elems.display.src = data;
    }
    /**
     * _onFileSelected
     * ----------------------------------------------------------------------------
     * handle when a file is selected
     */
    _onFileSelected() {
        let file;
        // Quit early if we don't have any files
        if (!this._files) {
            return;
        }
        // Try to grab the first file & quit if we can't
        file = this._files[0];
        if (!file) {
            return;
        }
        // load the image as a preview
        this._readFile(file)
            .then((photoURL) => { this._elems.display.src = photoURL; });
    }
    /**
     * _onLinkChange
     * ----------------------------------------------------------------------------
     * manage when the details of this photo change
     * @returns True if the link was changed appropriately
     */
    _onLinkChange() {
        let link = super._onLinkChange();
        this._elems.display.src = link;
        return link;
    }
    /**
     * _onClear
     * ----------------------------------------------------------------------------
     * handle clearing details within the file selector
     */
    clear() {
        this._data = "";
        this._elems.display.src = ""; // reset the photolink
    }
    /**
     * save
     * ----------------------------------------------------------------------------
     * @param   internalOnly    If true, we're only saving to our own data field,
     *                          not an external callers
     *
     * @returns The file path that is now saved
     */
    save(internalOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            if (internalOnly) {
                return;
            } // Don't do anything if this is an internal change
            if (this._files && this._onSaveCallback) { // Make sure that if we have files, we're uploading them
                let blobs = yield this._resizeImages(this._files); // resize images as appropriate
                this._data = yield this._onSaveCallback(this._files, blobs); // Run our callback
            }
            return this._data; // Return the appropriate data
        });
    }
    //..........................................
    //#region HELPERS
    _readFile(file, defer) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            return new Promise((resolve) => {
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
            });
        });
    }
    _loadImage(dataUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = new Image();
            img.src = dataUrl;
            return new Promise((resolve) => {
                img.onload = () => { resolve(img); };
            });
        });
    }
    /**
     * _renderOnCanvas
     * ----------------------------------------------------------------------------
     * generate the files on canvas, in order to resize them
     */
    _renderOnCanvas(img) {
        return __awaiter(this, void 0, void 0, function* () {
            let cvs = toolkip_create_elements_1.createElement({ type: "canvas" });
            // set default canvas size
            cvs.width = this._config.maxSize;
            cvs.height = this._config.maxSize;
            // adapt canvas to img size
            if (img.width > img.height) {
                cvs.height = (img.height * this._config.maxSize) / img.width;
            }
            else if (img.height > img.width) {
                cvs.width = (img.width * this._config.maxSize) / img.height;
            }
            // render the image at this size
            let ctx = cvs.getContext("2d");
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            // return the canvas's data as a file
            return new Promise((resolve) => {
                cvs.toBlob((blob) => { resolve(blob); });
            });
        });
    }
    /**
     * _resizeImages
     * ----------------------------------------------------------------------------
     * resize all images included in this image upload
     */
    _resizeImages(files) {
        return __awaiter(this, void 0, void 0, function* () {
            // quit if there is no resizing to do
            if (!this._config.maxSize) {
                return Promise.resolve([]);
            }
            let outFiles = [];
            // loop through each file and resize it
            for (let fIdx = 0; fIdx < files.length; fIdx += 1) {
                let blob = yield this._resizeImage(files[fIdx], outFiles);
                outFiles.push(blob);
            }
            // return the resized images
            return outFiles;
        });
    }
    _resizeImage(file, outFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataUrl = yield this._readFile(file);
            let img = yield this._loadImage(dataUrl);
            let blob = yield this._renderOnCanvas(img);
            return blob;
        });
    }
}
exports.PhotoPathField = PhotoPathField;
//..................
//#region STYLES
/** style the elements for this form element */
PhotoPathField._uncoloredStyles = {
    ".kipFormElem.photopath .photoOverlay": {
        backgroundColor: "rgba(0,0,0,.5)",
        opacity: "0",
        transition: ".1s opacity ease-in-out",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%"
    },
    ".kipFormElem.photopath .photoWrapper:hover .photoOverlay": {
        opacity: "1"
    },
    ".kipFormElem.photopath .photoWrapper": {
        width: "100px",
        height: "100px",
        borderRadius: "50px",
        border: "1px solid <formTheme>",
        overflow: "hidden",
        position: "relative"
    },
    ".kipFormElem.photopath .photoWrapper img": {
        width: "100%"
    },
    ".kipFormElem.photopath .photoWrapper .photoBtn": {
        width: "100%",
        backgroundColor: "<formTheme>",
        color: "#FFF",
        textAlign: "center",
        fontSize: "0.7em",
        cursor: "pointer",
        marginTop: "6px",
        opacity: "0.8"
    },
    ".kipFormElem.photopath .photoWrapper .photoBtn:hover": {
        opacity: "1"
    },
    ".kipFormElem.photopath .photoWrapper input[type='file']": {
        display: "none"
    }
};
