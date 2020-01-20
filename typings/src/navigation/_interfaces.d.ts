/**
 * INavigationData
 *
 * Keep track of the individual details from
 *
 */
export interface INavigationData<M> {
    url?: string;
    title?: string;
    isCancel?: boolean;
    [key: string]: any;
}
/**
 * IHistoryData
 *
 * Keep track of where we've navigated
 * @version 1.0
 *
 */
export interface IHistoryEntry<T> {
    /** keep track of what the path to navigation is */
    navigationPath: T;
    /** the URL to use to load the same page */
    url?: string;
    /** what the title of the site should be in the history */
    title?: string;
    /** any additional data to track in the history */
    data: INavigationData<any>;
}
export declare enum INavTransitionType {
    NONE = 0,
    OPACITY = 1,
    SLIDE_LEFT = 2,
    SLIDE_RIGHT = 3,
    SLIDE_UP = 4,
    SLIDE_DOWN = 5
}
