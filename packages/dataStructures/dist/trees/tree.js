"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_object_helpers_1 = require("@kipprice/toolkip-object-helpers");
class _Tree {
    //#endregion
    //.....................
    constructor(data) {
        this._data = data;
        this._subTrees = {};
    }
    //..........................................
    //#region IDENTITY FUNCTIONS
    isLeafNode() {
        let key = toolkip_object_helpers_1.getNextKey(this._subTrees);
        return (!key);
    }
    getDepth() {
        let depths = [1];
        toolkip_object_helpers_1.map(this._subTrees, (tree) => {
            depths.push(tree.getDepth() + 1);
        });
        return Math.max(...depths);
    }
    //#endregion
    //..........................................
    toString() {
        // create the string for the subtrees
        let subTrees = [];
        toolkip_object_helpers_1.map(this._subTrees, (subTree) => {
            subTrees.push(subTree.toString());
        });
        // include the center node
        let arr = [];
        arr.push(this._data.toString());
        if (subTrees.length > 0) {
            arr.push("->(");
            arr.push(subTrees.join(","));
            arr.push(")");
        }
        return arr.join("");
    }
}
exports._Tree = _Tree;
