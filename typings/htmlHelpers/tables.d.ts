/**
 * Creates a table with a specified set of cell elements
 * @param {string} tableID - The unique identifier to use for this table
 * @param {string} [tableClass] - The CSS class to use for the table
 * @param {array} elements - A 2D array of the indexing method [row][column] that contains the contents of the cell at this position that should be created within the table.
 *                         - Can come in three forms: a string of plain content, an already created element, or an object array with the following properties
 * @param {object} [elements[r][c].create] - An object to be passed into CreateElement, to generate the content of the cell
 * @param {string} [elements[r][c].content] - A string to be used as the content of the cell
 * @param {object} [elements[r][c].attr] - All additional attributes that should be applied to the cell (colspan & rowspan, e.g.)
 *
 * @returns {HTMLElement} The created HTML table
 *
 * */
export declare function createTable(tableID?: string, tableClass?: string, elements?: any[], rowNum?: number, colNum?: number): HTMLTableElement;
/**
 * Processes data that can be used to populate a table cell
 * @param  {any}                  data The data to populate the cell with
 * @param  {HTMLTableCellElement} cell The cell to populate
 * @return {HTMLTableCellElement}      The cell, newly populated with contents
 */
export declare function processCellContents(data: any, cell: HTMLTableCellElement): HTMLTableCellElement;
/**
 * Adds a row to an HTML table element
 * @param  {HTMLTableElement} table      The table element to add to
 * @param  {any[]}            [elements] Any elements that should be inccluded as cells in this row
 * @param  {number}           [idx]      The index at which this row should be added
 * @param  {number}           [colNum]   The number of columns that should be added to this row
 * @return {HTMLTableRowElement}       The row that was created
 */
export declare function addRow(table: HTMLTableElement, elements?: any[], idx?: number, colNum?: number): HTMLTableRowElement;
