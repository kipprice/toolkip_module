import { IDictionary } from "../../objectHelpers/_interfaces";
export declare abstract class Tree<T> {
    /** the data contained in the top level node of the tree */
    protected _data: T;
    /** subtrees below this tree */
    protected _subTrees: IDictionary<Tree<T>>;
    /** keep track of the parent */
    protected _parent: Tree<T>;
    constructor(data: T);
    isLeafNode(): boolean;
    getDepth(): number;
    toString(): string;
    abstract add(value: T): void;
    abstract remove(value: T): void;
}
