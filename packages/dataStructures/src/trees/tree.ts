import { getNextKey, map, IDictionary } from "@toolkip/object-helpers";


export abstract class _Tree<T> {

	//.....................
	//#region PROPERTIES
	
	/** the data contained in the top level node of the tree */
	protected _data: T;

	/** subtrees below this tree */
	protected _subTrees: IDictionary<_Tree<T>>;

	/** keep track of the parent */
	protected _parent: _Tree<T>;
	
	//#endregion
	//.....................

	public constructor(data: T) {
		this._data = data;
		this._subTrees = {};
	}

	//..........................................
	//#region IDENTITY FUNCTIONS
	
	public isLeafNode(): boolean {
		let key = getNextKey(this._subTrees);
		return (!key);
	}

	public getDepth(): number {
		let depths = [1];
		map(this._subTrees, (tree) => {
			depths.push(tree.getDepth() + 1);
		});
		return Math.max(...depths);
	}
	
	//#endregion
	//..........................................

	public toString(): string {

		// create the string for the subtrees
		let subTrees = [];
		map(this._subTrees, (subTree: _Tree<T>) => {
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

	//..........................................
	//#region ABSTRACT FUNCTIONS
	
	public abstract add(value: T): void;
	public abstract remove(value: T): void;
	
	//#endregion
	//..........................................

}