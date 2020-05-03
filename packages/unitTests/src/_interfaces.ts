export interface TestResults<T> {
	name: string;
	expectedResult?: T;
	actualResult?: T;
	pass: boolean;
	message?: string;
}

export interface IUnitTestDetails {
	params: any[];
	result: any;
	details?: string;
}

export interface IVisualTestButton {
    label: string;
    callback: Function;
}