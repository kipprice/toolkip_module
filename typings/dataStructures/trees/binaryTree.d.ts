import { IComparable } from '../../comparable/comparable';
import { IDictionary } from '../../objectHelpers/_interfaces';
import { Tree } from './tree';
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
export declare class BinaryTree<T extends Comparable> extends Tree<T> {
    protected _subTrees: IDictionary<BinaryTree<T>, ISubTrees>;
    protected _parent: BinaryTree<T>;
    protected _count: number;
    constructor(data: T);
    add(value: T): void;
    protected _addToSubTree(type: ISubTrees, value: T): void;
    remove(value: T): void;
    protected _removeMe(): void;
    protected _removeMeAsTopNode(): void;
    protected _removeFromSubTree(type: ISubTrees, value: T): void;
    exists(value: T): boolean;
    protected _checkSubTreeExists(type: ISubTrees, value: T): boolean;
    max(): T;
    min(): T;
    protected _compare(value: T): CompareResult;
    protected _compareObject(value: IComparable): CompareResult;
    protected _comparePrimitive(value: string | number): CompareResult;
    protected _getRelationToParent(): ISubTrees;
    isComplete(): boolean;
    isBalanced(): boolean;
    protected _isSubTreeBalanced(type: ISubTrees): boolean;
    protected _getSideDepth(type: ISubTrees): number;
    protected _createSubTree(value: T): BinaryTree<T>;
    toString(): string;
}
export declare type Comparable = IComparable | string | number;
export declare type ISubTrees = "left" | "right";
export declare enum CompareResult {
    ERR = 0,
    LESS_THAN = 1,
    EQUAL = 2,
    GREATER_THAN = 3
}
