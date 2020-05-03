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
/**----------------------------------------------------------------------------
 * @class	Binder
 * ----------------------------------------------------------------------------
 * keeps track of all bound elements and consolidates into a single animation
 * frame event; prevents poor performance with lots of bound views
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class _Binder {
    //#endregion
    //..........................................
    //..........................................
    //#region CONSTRUCTORS
    /**
     * Binder
     * ----------------------------------------------------------------------------
     * generate a single instance of the binder
     */
    constructor() {
        /** assign a unique ID to each bound function */
        this._id = 0;
        /** check whether we have started binding already */
        this._started = false;
        this._boundDetails = {};
        this._startAnimationLoop();
    }
    //#endregion
    //.....................
    //..........................................
    //#region HANDLE IDENTIFIERS
    /**
     * _getNextId
     * ----------------------------------------------------------------------------
     * find the next unique ID
     */
    _getNextId() {
        this._id += 1;
        return this._id.toString();
    }
    //#endregion
    //..........................................
    //...............................................................
    //#region PUBLIC FUNCS FOR REGISTERING / UNREGISTERING BINDINGS
    /**
     * bind
     * ----------------------------------------------------------------------------
     * tie a particular model to an update function
     */
    bind(evalFunc, updateFunc, skipFunc, equalsFunc) {
        if (!evalFunc || !updateFunc) {
            return "";
        }
        // initialize appropriately if the value is already set
        let lastValue = evalFunc();
        if (lastValue) {
            toolkip_async_1.nextRender().then(() => updateFunc(lastValue));
        }
        let details = {
            id: this._getNextId(),
            eval: evalFunc,
            update: (val) => {
                updateFunc(val);
            },
            skip: skipFunc || (() => false),
            lastValue: lastValue,
            equals: equalsFunc || ((a, b) => { return a === b; })
        };
        // add to our dictionary
        this._boundDetails[details.id] = details;
        // return the identifier of the bound function
        return details.id;
    }
    /**
     * unbind
     * ----------------------------------------------------------------------------
     * unregister a binding if appropriate
     */
    unbind(key) {
        if (!this._boundDetails[key]) {
            return false;
        }
        delete this._boundDetails[key];
        return true;
    }
    //#endregion
    //...............................................................
    //..........................................
    //#region SHARED ANIMATION FRAME HANDLING
    /**
     * _startAnimationLoop
     * ----------------------------------------------------------------------------
     * generate the appropriate loop
     */
    _startAnimationLoop() {
        if (this._started) {
            return;
        }
        this._onFrame();
    }
    /**
     * _onFrame
     * ----------------------------------------------------------------------------
     * update all bound functions
     */
    _onFrame() {
        return __awaiter(this, void 0, void 0, function* () {
            toolkip_object_helpers_1.map(this._boundDetails, (details) => {
                this._handlingBinding(details);
            });
            // queue up the next render
            return toolkip_async_1.nextRender().then(() => this._onFrame());
        });
    }
    /**
     * _handlingBinding
     * ----------------------------------------------------------------------------
     * evaluate whether a particular binding has been updated
     */
    _handlingBinding(details) {
        return __awaiter(this, void 0, void 0, function* () {
            // check first if this element should be skipped
            if (details.skip()) {
                return;
            }
            // next check if the value has changed
            let newVal = details.eval();
            if (details.equals(newVal, details.lastValue)) {
                return;
            }
            // last, perform the update function
            details.lastValue = newVal;
            details.update(newVal);
        });
    }
}
exports.Binder = new _Binder();
