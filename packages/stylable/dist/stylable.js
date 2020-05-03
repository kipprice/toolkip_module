"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_style_helpers_1 = require("@kipprice/toolkip-style-helpers");
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
const toolkip_named_class_1 = require("@kipprice/toolkip-named-class");
const toolkip_media_queries_1 = require("@kipprice/toolkip-media-queries");
const toolkip_style_libraries_1 = require("@kipprice/toolkip-style-libraries");
/**----------------------------------------------------------------------------
 * @class Stylable
 * ----------------------------------------------------------------------------
 * Creates an element that can additionally add CSS styles
 * @author  Kip Price
 * @version 1.1.2
 * ----------------------------------------------------------------------------
 */
class _Stylable extends toolkip_named_class_1._NamedClass {
    //#endregion
    //..........................................
    //...........................
    //#region INSTANCE METHODS
    /**
     * Stylable
     * ----------------------------------------------------------------------------
     * Creates a stylable class
     */
    constructor() {
        super("Stylable");
        /** store the values we've set for various placeholders */
        this._placeholderValues = {};
        this._mergedStyles = this._uncoloredStyles;
        this._createStyles();
        toolkip_media_queries_1.registerStandardMediaQueries();
    }
    get _uncoloredStyles() { return this.constructor._uncoloredStyles; }
    get _styleDependencies() { return this.constructor._styleDependencies; }
    /** overridable function for grabbing a unique key for this element */
    get _uniqueKey() { return this.constructor.name; }
    //#endregion
    //................................................
    //..........................................
    //#region STATIC METHODS
    /**
     * createStyles
     * ----------------------------------------------------------------------------
     * creates all of the styles that are associated with this stylable, or
     * listed as dependencies. This is performed at the class level because an
     * implementer of the Stylable could legitimately be uninstantiable (e.g.
     * an abstract parent class like Shield)
     *
     * @param   uniqueKey   The identifier for this class; uses the name of the class
     *                      if not provided
     * @param
     */
    static createStyles(uniqueKey, mergedStyles, forceOverride) {
        if (!uniqueKey) {
            uniqueKey = this.name;
        }
        if (!mergedStyles) {
            mergedStyles = this._uncoloredStyles;
        }
        this._createParentStyles();
        this._createStyleDependencies();
        this._createSelfStyles(uniqueKey, mergedStyles, forceOverride);
    }
    /**
     * _createStyleDependencies
     * ----------------------------------------------------------------------------
     * render all of the styles that this drawable is dependent on existing
     */
    static _createStyleDependencies() {
        const dependencies = this._styleDependencies;
        if (!dependencies) {
            return;
        }
        // loop through dependencies and ensure they have their styles created
        for (let s of dependencies) {
            s.createStyles();
        }
    }
    /**
     * _createParentStyles
     * ----------------------------------------------------------------------------
     * go through each of the stylables in the inheritance chain and create their
     * styles if not already created (and there are styles to create)
     */
    static _createParentStyles() {
        // first prototype is of this class; second
        // is the parent
        let parent = toolkip_object_helpers_1.getPrototype(toolkip_object_helpers_1.getPrototype(this));
        while (parent && isStylable(parent)) {
            const pConstructor = parent.constructor;
            if (pConstructor.hasOwnProperty("_uncoloredStyles")) {
                pConstructor.createStyles();
            }
            parent = toolkip_object_helpers_1.getPrototype(parent);
        }
    }
    /**
     * _createStyles
     * ----------------------------------------------------------------------------
     * Create the styles for this class
     * @param   forceOverride   True if we should create the classes even if they
     *                          already exist
     */
    static _createSelfStyles(uniqueKey, mergedStyles, forceOverride) {
        // if we don't have styles, or we've already created, quit
        if (toolkip_object_helpers_1.isEmptyObject(mergedStyles)) {
            return;
        }
        if (!this.hasOwnProperty("_uncoloredStyles")) {
            return;
        }
        if (toolkip_style_libraries_1.StyleLibrary.hasStyles(uniqueKey) && !forceOverride) {
            return;
        }
        // ==> flatten & split our styles
        let flattenedStyles = toolkip_style_helpers_1.flattenStyles(mergedStyles);
        let split = toolkip_style_helpers_1.splitStyles(flattenedStyles);
        // ==> send the styles to their appropriate handlers
        toolkip_style_libraries_1.StyleLibrary.add(uniqueKey, split.standard, forceOverride);
        toolkip_style_libraries_1.PlaceholderLibrary.add(uniqueKey, split.withPlaceholders, forceOverride);
    }
    /**
     * mergeInStyles
     * ----------------------------------------------------------------------------
     * allow a caller to add styles after class creation, to more specifically
     * override the styles of a class
     */
    mergeInStyles(...themes) {
        this._mergedStyles = toolkip_style_helpers_1.combineStyles(this._mergedStyles, ...themes);
        this._createStyles(true);
        return this;
    }
    /**
     * createStyles
     * ----------------------------------------------------------------------------
     * allow for creating this stylables styles from outside of a specific class
     * replaces the "preemptivelyCreateStyles" function
     */
    _createStyles(forceOverride) {
        if (this._shouldSkipStyles()) {
            return;
        }
        this.constructor.createStyles(this._uniqueKey, this._mergedStyles, forceOverride);
    }
    /**
     * _shouldSkipStyles
     * ----------------------------------------------------------------------------
     * determine if we should create styles for this class, based on whether
     * there are actually styles to create
     */
    _shouldSkipStyles() {
        const c = this.constructor;
        // check if the properties are our own
        if (c.hasOwnProperty("_uncoloredStyles")) {
            return false;
        }
        // check if the parent styles were already created
        const parentProto = toolkip_object_helpers_1.getPrototype(toolkip_object_helpers_1.getPrototype(c));
        if (toolkip_style_libraries_1.PlaceholderLibrary.hasStyles(parentProto._uniqueKey)) {
            return true;
        }
        return false;
    }
    /**
     * replacePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instances of the specified placeholder with the provided value
     * across all instances of this stylable
     */
    replacePlaceholder(placeholderName, placeholderValue, noForce) {
        if (this._placeholderValues[placeholderName] && noForce) {
            return;
        }
        this._placeholderValues[placeholderName] = placeholderValue;
        let styleKeys = this._buildStyleMap();
        for (let k of styleKeys) {
            toolkip_style_libraries_1.PlaceholderLibrary.replacePlaceholder({
                placeholder: placeholderName,
                newValue: placeholderValue,
                uniqueKey: k
            });
        }
    }
    /**
     * _buildStyleMap
     * ----------------------------------------------------------------------------
     * generate the styles that will need to be updated with the provided
     * placeholder
     */
    _buildStyleMap() {
        const out = [this._uniqueKey];
        // loop through all of the dependencies
        for (let s of this._styleDependencies) {
            out.push(s.name);
        }
        // loop through all the parent classes
        let parent = toolkip_object_helpers_1.getPrototype(toolkip_object_helpers_1.getPrototype(this));
        while (parent && isStylable(parent)) {
            out.push(parent._uniqueKey);
            parent = toolkip_object_helpers_1.getPrototype(parent);
        }
        return out;
    }
    /**
     * overridePlaceholder
     * ----------------------------------------------------------------------------
     * replace all instancaes of the specified placeholder with the provided value
     * only for this particular instance
     */
    overridePlaceholder(placeholderName, placeholderValue, elem) {
        let styleKeys = this._buildStyleMap();
        for (let k of styleKeys) {
            toolkip_style_libraries_1.PlaceholderLibrary.replacePlaceholder({
                placeholder: placeholderName,
                newValue: placeholderValue,
                uniqueKey: k,
                baseElem: elem
            });
        }
    }
}
exports._Stylable = _Stylable;
/** store the dependencies that this class has on other stylables */
_Stylable._styleDependencies = [];
function isStylable(obj) {
    return !!obj.mergeInStyles;
}
