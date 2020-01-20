import { BinaryTree, ISubTrees, Comparable } from './binaryTree';
import { IDictionary } from '../../objectHelpers/_interfaces';
/**----------------------------------------------------------------------------
 * @class	BalancedBinaryTree
 * ----------------------------------------------------------------------------
 * handle balancing a binary tree
 * @author	Kip Price
 * @version	1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class BalancedBinaryTree<T extends Comparable> extends BinaryTree<T> {
    /** keep track of an actual root node, so that we can keep references the same when rebalancing */
    protected _root: BinaryTree<T>;
    /** pass throughs for the data proprty to draw from the binary tree node */
    protected get _data(): T;
    protected set _data(value: T);
    /** keep track of the subtrees */
    protected _subTrees: IDictionary<BalancedBinaryTree<T>, ISubTrees>;
    constructor(data: T);
    add(value: T): void;
    remove(value: T): void;
    protected _rebalance(): void;
    protected _rotate(type: ISubTrees): void;
    protected _oppositeSide(type: ISubTrees): ISubTrees;
    protected _rebalanceSubTree(type: ISubTrees): void;
    protected _createSubTree(value: T): BalancedBinaryTree<T>;
}
export declare class SelfBalancingBinaryTree<T extends Comparable> extends BinaryTree<T> {
    protected _tree: BinaryTree<T>;
    constructor(value: T);
    add(value: T): void;
    remove(value: T): void;
    isBalanced(): boolean;
    isComplete(): boolean;
    isLeafNode(): boolean;
    toString(): string;
    getDepth(): number;
    protected _rebalance(tree: SelfBalancingBinaryTree<T>): void;
    protected _rebalanceSubTree(tree: SelfBalancingBinaryTree<T>, side: ISubTrees): void;
    protected _rotate(tree: SelfBalancingBinaryTree<T>, side: ISubTrees): void;
    protected _oppositeSide(type: ISubTrees): ISubTrees;
}
