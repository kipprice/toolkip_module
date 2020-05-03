"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binaryTree_1 = require("./binaryTree");
/**----------------------------------------------------------------------------
 * @class	BalancedBinaryTree
 * ----------------------------------------------------------------------------
 * handle balancing a binary tree
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
class BalancedBinaryTree extends binaryTree_1.BinaryTree {
    //#endregion
    //.....................
    constructor(data) {
        super(null);
        this._root = new binaryTree_1.BinaryTree(data);
    }
    /** pass throughs for the data proprty to draw from the binary tree node */
    get _data() { return this._root._data; }
    set _data(value) { }
    add(value) {
        super.add(value);
        while (!this.isBalanced()) {
            this._rebalance();
        }
    }
    remove(value) {
        super.remove(value);
        while (!this.isBalanced()) {
            this._rebalance();
        }
    }
    _rebalance() {
        console.log(this.toString());
        // try balancing each side to see if that gets us anywhere
        this._rebalanceSubTree("left");
        this._rebalanceSubTree("right");
        // if we are now balanced, no need to do anything else
        if (this.isBalanced()) {
            return;
        }
        let leftDepth = this._getSideDepth("left");
        let rightDepth = this._getSideDepth("right");
        if (leftDepth > rightDepth) {
            this._rotate("left");
        }
        else {
            this._rotate("right");
        }
        return;
    }
    _rotate(type) {
        let subTree = this._subTrees[type];
        let oppositeSide = this._oppositeSide(type);
        // update parents appropriately
        subTree._parent = this._parent;
        this._parent = subTree;
        // update the way the children point
        if (subTree[oppositeSide]) {
            this._subTrees[type] = subTree[oppositeSide];
            this._subTrees[type]._parent = this;
        }
        else {
            delete this._subTrees[type];
        }
        subTree[oppositeSide] = this;
    }
    _oppositeSide(type) {
        switch (type) {
            case "left": return "right";
            case "right": return "left";
            default: return null;
        }
    }
    _rebalanceSubTree(type) {
        if (this._isSubTreeBalanced(type)) {
            return;
        }
        return this._subTrees[type]._rebalance();
    }
    _createSubTree(value) {
        return new BalancedBinaryTree(value);
    }
}
exports.BalancedBinaryTree = BalancedBinaryTree;
class SelfBalancingBinaryTree extends binaryTree_1.BinaryTree {
    //#endregion
    //.....................
    //..........................................
    //#region OVERRIDES
    constructor(value) {
        super(null);
        this._tree = new binaryTree_1.BinaryTree(value);
    }
    add(value) {
        this._tree.add(value);
        console.log(this.toString());
        if (this._tree.isBalanced()) {
            return;
        }
        this._rebalance(this._tree);
        console.log("After Rebalance: " + this.toString());
    }
    remove(value) {
        this._tree.remove(value);
        if (this._tree.isBalanced()) {
            return;
        }
        this._rebalance(this._tree);
    }
    //#endregion
    //..........................................
    //..........................................
    //#region PASS THROUGH FUNCTIONS
    isBalanced() { return this._tree.isBalanced(); }
    isComplete() { return this._tree.isComplete(); }
    isLeafNode() { return this._tree.isLeafNode(); }
    toString() { return this._tree.toString(); }
    getDepth() { return this._tree.getDepth(); }
    //#endregion
    //..........................................
    _rebalance(tree) {
        // try to rebalance at a lower level first
        this._rebalanceSubTree(tree, "left");
        this._rebalanceSubTree(tree, "right");
        // if we are balanced now, continue on
        if (tree.isBalanced()) {
            return;
        }
        // otherwise, we need to figure out which side needs to be adjusted
        let leftDepth = tree._getSideDepth("left");
        let rightDepth = tree._getSideDepth("right");
        if (leftDepth > rightDepth) {
            this._rotate(tree, "left");
        }
        else {
            this._rotate(tree, "right");
        }
    }
    _rebalanceSubTree(tree, side) {
        if (!tree._subTrees[side]) {
            return;
        }
        if (tree._subTrees[side].isBalanced()) {
            return;
        }
        return this._rebalance(tree._subTrees[side]);
    }
    _rotate(tree, side) {
        let oppositeSide = this._oppositeSide(side);
        // get the node we are swapping with
        let newRoot = tree._subTrees[side];
        if (!newRoot) {
            return;
        }
        // make sure the old parent appropriately points to the new root
        let parent = tree._parent;
        if (parent) {
            parent._subTrees[tree._getRelationToParent()] = newRoot;
        }
        else {
            this._tree = newRoot;
        }
        // update the respective parents of the nodes that are getting updated
        newRoot._parent = parent;
        tree._parent = newRoot;
        // update the way the children point
        if (newRoot._subTrees[oppositeSide]) {
            tree._subTrees[side] = newRoot._subTrees[oppositeSide];
            tree._subTrees[side]._parent = tree;
        }
        else {
            delete tree._subTrees[side];
        }
        // ensure that the new root points to the old node
        newRoot._subTrees[oppositeSide] = tree;
    }
    //..........................................
    //#region HELPERS
    _oppositeSide(type) {
        switch (type) {
            case "left": return "right";
            case "right": return "left";
            default: return null;
        }
    }
}
exports.SelfBalancingBinaryTree = SelfBalancingBinaryTree;
