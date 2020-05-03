"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_comparable_1 = require("@kipprice/toolkip-comparable");
const tree_1 = require("./tree");
/**----------------------------------------------------------------------------
 * @class	BinaryTree
 * ----------------------------------------------------------------------------
 * Create a version of a binary tree that can be very unbalanced, but will be
 * a binary tree (all left nodes are less than the parent node; all right nodes
 * are greater than the parent node)
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class BinaryTree extends tree_1._Tree {
    //#endregion
    //.....................
    constructor(data) {
        super(data);
        this._count = 1;
    }
    //..........................................
    //#region ADDING NEW NODES
    add(value) {
        let compareResult = this._compare(value);
        switch (compareResult) {
            case CompareResult.EQUAL:
                this._count += 1;
                break;
            case CompareResult.LESS_THAN:
                this._addToSubTree("left", value);
                break;
            case CompareResult.GREATER_THAN:
                this._addToSubTree("right", value);
                break;
        }
    }
    _addToSubTree(type, value) {
        if (!this._subTrees[type]) {
            this._subTrees[type] = this._createSubTree(value);
            this._subTrees[type]._parent = this;
        }
        this._subTrees[type].add(value);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region REMOVING NODES
    remove(value) {
        let compareResult = this._compare(value);
        switch (compareResult) {
            case CompareResult.EQUAL:
                this._removeMe();
                break;
            case CompareResult.LESS_THAN:
                this._removeFromSubTree("left", value);
                break;
            case CompareResult.GREATER_THAN:
                this._removeFromSubTree("right", value);
                break;
        }
    }
    _removeMe() {
        let sideOfParent = this._getRelationToParent();
        if (!sideOfParent) {
            return this._removeMeAsTopNode();
        }
        // there is likely a better way to do this, but because 
        // we already know that the add function works as appropriate, 
        // it's probably fine to just readd the children of this node
        delete this._parent[sideOfParent];
        // TODO: finish
    }
    _removeMeAsTopNode() {
    }
    _removeFromSubTree(type, value) {
        if (!this._subTrees[type]) {
            return;
        }
        this._subTrees[type].remove(value);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region EXISTENCE CHECKS
    exists(value) {
        let compareResult = this._compare(value);
        switch (compareResult) {
            case CompareResult.EQUAL:
                return true;
            case CompareResult.LESS_THAN:
                return this._checkSubTreeExists("left", value);
            case CompareResult.GREATER_THAN:
                return this._checkSubTreeExists("right", value);
            default:
                return false;
        }
    }
    _checkSubTreeExists(type, value) {
        if (!this._subTrees[type]) {
            return false;
        }
        return this._subTrees[type].exists(value);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region FINDING EXTREMA
    max() {
        if (this._subTrees.right) {
            return this._subTrees.right.max();
        }
        return this._data;
    }
    min() {
        if (this._subTrees.left) {
            return this._subTrees.left.min();
        }
        return this._data;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region COMPARISON HELPERS
    _compare(value) {
        if (toolkip_comparable_1.isComparable(value)) {
            return this._compareObject(value);
        }
        else {
            return this._comparePrimitive(value);
        }
    }
    _compareObject(value) {
        if (!value) {
            return CompareResult.ERR;
        }
        let myValue = this._data;
        if (!myValue) {
            return CompareResult.ERR;
        }
        if (value.equals(myValue)) {
            return CompareResult.EQUAL;
        }
        else if (value.lessThan(myValue)) {
            return CompareResult.LESS_THAN;
        }
        else if (value.greaterThan(myValue)) {
            return CompareResult.GREATER_THAN;
        }
        return CompareResult.ERR;
    }
    _comparePrimitive(value) {
        if (value < this._data) {
            return CompareResult.LESS_THAN;
        }
        if (value > this._data) {
            return CompareResult.GREATER_THAN;
        }
        return CompareResult.EQUAL;
    }
    _getRelationToParent() {
        let comparedToParent = CompareResult.ERR;
        if (this._parent) {
            comparedToParent = this._compare(this._parent._data);
        }
        switch (comparedToParent) {
            case CompareResult.LESS_THAN: return "right";
            case CompareResult.GREATER_THAN: return "left";
        }
        return null;
    }
    //#endregion
    //..........................................
    //..........................................
    //#region IDENTITY FUNCTIONS
    isComplete() {
        if (!this._subTrees.left && !this._subTrees.right) {
            return true;
        }
        if (!this._subTrees.left) {
            return false;
        }
        if (!this._subTrees.right) {
            return false;
        }
        if (!this._subTrees.left.isComplete()) {
            return false;
        }
        if (!this._subTrees.right.isComplete()) {
            return false;
        }
        return true;
    }
    isBalanced() {
        let leftDepth = this._getSideDepth("left");
        let rightDepth = this._getSideDepth("right");
        if (Math.abs(leftDepth - rightDepth) > 1) {
            return false;
        }
        if (!this._isSubTreeBalanced("left")) {
            return false;
        }
        if (!this._isSubTreeBalanced("right")) {
            return false;
        }
        return true;
    }
    _isSubTreeBalanced(type) {
        if (!this._subTrees[type]) {
            return true;
        }
        return this._subTrees[type].isBalanced();
    }
    _getSideDepth(type) {
        if (!this._subTrees[type]) {
            return 0;
        }
        return this._subTrees[type].getDepth();
    }
    //#endregion
    //..........................................
    //..........................................
    //#region FACTORY FUNCTIONS
    _createSubTree(value) {
        return new BinaryTree(value);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region OVERRIDES
    toString() {
        let subTrees = [];
        if (this._subTrees.left) {
            subTrees.push(this._subTrees.left);
        }
        if (this._subTrees.right) {
            subTrees.push(this._subTrees.right);
        }
        let arr = [];
        arr.push(this._data);
        if (subTrees.length > 0) {
            arr.push("->(");
            arr.push(subTrees.join(","));
            arr.push(")");
        }
        return arr.join("");
    }
}
exports.BinaryTree = BinaryTree;
var CompareResult;
(function (CompareResult) {
    CompareResult[CompareResult["ERR"] = 0] = "ERR";
    CompareResult[CompareResult["LESS_THAN"] = 1] = "LESS_THAN";
    CompareResult[CompareResult["EQUAL"] = 2] = "EQUAL";
    CompareResult[CompareResult["GREATER_THAN"] = 3] = "GREATER_THAN";
})(CompareResult = exports.CompareResult || (exports.CompareResult = {}));
//#endregion
//..........................................
