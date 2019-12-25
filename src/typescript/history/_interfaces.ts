/**
 * Undoable
 * ----------------------------------------------------------------------------
 * Keep track of an action that can be undone
 */
export interface Undoable {
    forwardFunction: Function;
    reverseFunction: Function;
}