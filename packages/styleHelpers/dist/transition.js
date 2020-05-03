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
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_async_1 = require("@kipprice/toolkip-async");
const css_1 = require("./css");
const styleElement_1 = require("./styleElement");
const stringifier_1 = require("./stringifier");
/**----------------------------------------------------------------------------
 * @class	TransitionController
 * ----------------------------------------------------------------------------
 * keep track of the transitions that have been performed & manage generating
 * new ones
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _TransitionController {
    constructor() {
        //.....................
        //#region PROPERTIES
        /** the last identifier we used for a generated class */
        this._lastClsId = 0;
        /** all classes that we've already generated; key is the string version of the class, value is the class ID */
        this._generatedClasses = {};
        //#endregion
        //..........................................
    }
    //#endregion
    //.....................
    //..........................................
    //#region PUBLIC METHODS
    /**
     * transition
     * ----------------------------------------------------------------------------
     * add a transitionary class to the specified element
     *
     * @param   details     object containing details about the transition to be
     *                      performed
     *
     * @returns     A promise that resolves once the transition is over
     */
    transition(details) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!details.elem) {
                return Promise.reject("no element");
            }
            if (!details.time) {
                return Promise.reject("no time");
            }
            // get or generate the starting class
            let startName = this._getClass(details.start, details.elem);
            // get or generate the ending class
            if (!details.end.transition) {
                details.end.transition = "all ease-in-out " + (details.time / 1000) + "s";
            }
            let endName = this._getClass(details.end, details.elem);
            // actually animate the transition
            yield this._animate(details, startName, endName);
        });
    }
    //#endregion
    //..........................................
    //..........................................
    //#region CLASS NAMING
    /**
     * _getClassName
     * ----------------------------------------------------------------------------
     * gets an existing class name if one exists for this style config; otherwise
     * creates a new generated class name
     *
     * @param   classDef    the style that will be generated
     *
     * @returns the existing class name or a new class name for this style
     */
    _getClass(classDef, elem) {
        // get the absolute version of this class definition
        classDef = this._replacePlaceholders(classDef, elem);
        // turn the class into a string, to check it against our existing classes
        let strDef = JSON.stringify(classDef).replace(/ /g, "");
        // return the existing class if we have one that's a match
        if (this._generatedClasses[strDef]) {
            return this._generatedClasses[strDef];
        }
        // otherwise, generate a new class
        let name = this._generateRandomClassName();
        this._generatedClasses[strDef] = name;
        this._createTransitionClass(name, classDef, elem);
        return name;
    }
    /**
     * _generateRandomClassName
     * ----------------------------------------------------------------------------
     * create a randomized class name to use for this transition
     */
    _generateRandomClassName() {
        this._lastClsId += 1;
        return "gencls" + this._lastClsId;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region CREATE TRANSITION CLASSES
    /**
     * _createTransitionClass
     * ---------------------------------------------------------------------------
     * Create a CSS class that will be one end of a transition
     *
     * @param   className   Selector to use for the class
     * @param   classDef    Definition for the class
     * @param   elem        Element this class will be applied to
     *
     * @returns The updated CSS class
     */
    _createTransitionClass(className, classDef, elem) {
        // create our style element if it doesn't exist
        if (!this._styleElem) {
            this._createStyleElem();
        }
        // generate the new contents for our style tag
        this._styleElem.innerHTML += stringifier_1.stringifyStyle("." + className, classDef);
    }
    /**
     * _replacePlaceholders
     * ----------------------------------------------------------------------------
     * ensure that we replace any placeholders accepted in transition classes with
     * the real measurement
     */
    _replacePlaceholders(classDef, elem) {
        toolkip_object_helpers_1.map(classDef, (value, key) => {
            value = value.replace("<width>", (elem.offsetWidth + 1) + "px");
            value = value.replace("<height>", elem.offsetHeight + "px");
            value = value.replace("<left>", elem.offsetLeft + "px");
            value = value.replace("<top>", elem.offsetTop + "px");
            value = value.replace("<right>", (elem.offsetLeft + elem.offsetWidth) + "px");
            value = value.replace("<bottom>", (elem.offsetTop + elem.offsetHeight) + "px");
            classDef[key] = value;
        });
        return classDef;
    }
    /**
     * _createStyleElem
     * ----------------------------------------------------------------------------
     * creates a shared style tag for this class, so that we can continue to add
     * to it
     */
    _createStyleElem() {
        this._styleElem = styleElement_1.createStyleElement();
        document.head.appendChild(this._styleElem);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region ACTUALLY ANIMATE
    /**
     * _animate
     * ----------------------------------------------------------------------------
     * add classes in the appropriate timeframe
     */
    _animate(details, startName, endName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield toolkip_async_1.nextRender(); // ensure the class exists
            css_1.addClass(details.elem, startName); // start by adding the start class
            yield toolkip_async_1.wait(details.delay || 0); // wait for the delay to complete
            css_1.addClass(details.elem, endName); // add the end class to start the transition
            yield toolkip_async_1.wait(details.time); // wait for the transition to complete
            css_1.removeClass(details.elem, startName); // remove the start class
            yield toolkip_async_1.nextRender(); // and wait until the next frame
            // remove the end class after the caller has had time to apply the permanent state
            this._removeEndClass(details.elem, endName);
            return;
        });
    }
    /**
     * _removeEndClass
     * ----------------------------------------------------------------------------
     * remove the end-state class
     */
    _removeEndClass(elem, endName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield toolkip_async_1.wait(10);
            css_1.removeClass(elem, endName);
        });
    }
}
const TransitionController = new _TransitionController();
//..........................................
//#region SHORTENED ACCESS
/**
 * transition
 * ---------------------------------------------------------------------------
 * Transition an element to a particular style, then alert the caller that
 * it has completed
 *
 * @param   element     The element to transition
 * @param   startStyle  If needed, any specific new attributes that are needed for this object
 * @param   endStyle    The style we should end up with
 * @param   time        How long this transition should take
 * @param   delay       How long this transition should be delayed
 *
 * @returns Promise that will be called after transition completes
 */
function transition(element, startStyle, endStyle, time, delay) {
    return TransitionController.transition({
        elem: element,
        start: startStyle,
        end: endStyle,
        time: time,
        delay: delay || 0
    });
}
exports.transition = transition;
//#endregion
//..........................................
