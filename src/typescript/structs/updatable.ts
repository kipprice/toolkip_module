/** allow duck typing for classes that allow updating */
export interface IUpdatable {
	update(...args: any[]): void;
}
