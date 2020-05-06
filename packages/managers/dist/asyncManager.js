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
const dataManager_1 = require("./dataManager");
/**----------------------------------------------------------------------------
 * @class	_AsyncManager
 * ----------------------------------------------------------------------------
 * Manages a set of models that can be loaded from the server
 * @author	Kip Price
 * @version	1.1.0
 * ----------------------------------------------------------------------------
 */
class AsyncManager extends dataManager_1.DataManager {
    //#endregion
    //.....................
    //..........................................
    //#region CREATE THE MANAGER
    constructor(load, create) {
        super();
        this._innerLoad = load;
        this._innerCreate = create;
        this._inFlight = {};
    }
    /**
     * _createAndAddDefault
     * ----------------------------------------------------------------------------
     * add a default value
     */
    _createAndAddDefault(d) {
        let model = this.create(d);
        this.add(model);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region RETRIEVE DATA
    /**
     * getOrCreate
     * ----------------------------------------------------------------------------
     * get the data associated with a particular ID
     */
    getOrCreate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate input
            if (!id) {
                throw new Error("no ID provided");
            }
            // check if we already have info on this element; if so, return it
            let datum = this.get(id);
            if (datum) {
                return datum;
            }
            // check if we are already running a request for this element
            // if so, return the current request
            if (this._inFlight[id]) {
                return this._inFlight[id];
            }
            // otherwise, run the appropriate loading code for this element
            this._inFlight[id] = this._loadAndCreate(id);
            return this._inFlight[id];
        });
    }
    /**
     * _loadAndCreate
     * ---------------------------------------------------------------------------
     * create a new element via the appropriate loading call
     */
    _loadAndCreate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = yield this.load(id);
            if (!d) {
                throw new Error("no data found for id '" + id + "'");
            }
            ;
            // create the appropriate model
            let model = this.create(d);
            let datum = model;
            this.add(datum);
            return datum;
        });
    }
    //#endregion
    //..........................................
    //..........................................
    //#region GENERATE NEW DATA
    /**
     * create
     * ----------------------------------------------------------------------------
     * create a new element
     */
    create(d) {
        if (this._innerCreate) {
            return this._innerCreate(d);
        }
        else
            return d;
    }
    /**
     * load
     * ----------------------------------------------------------------------------
     * load details about the element tied to the specified ID
     */
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._innerLoad) {
                Promise.reject('innerLoad not defined');
            }
            return this._innerLoad(id);
        });
    }
}
exports.AsyncManager = AsyncManager;
