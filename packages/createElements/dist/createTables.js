"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createElement_1 = require("./createElement");
/**
 * createTable
 *-------------------------------------------------------------------------------------
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
function createTable(tableID, tableClass, elements, rowNum, colNum) {
    let tbl;
    let row;
    let cell;
    let elem;
    let rIdx;
    let cIdx;
    // Set a row number
    if (!rowNum) {
        rowNum = (elements && elements.length) || 0;
    }
    // Create the table
    tbl = createElement_1.createElement({
        type: "table",
        cls: tableClass
    });
    for (rIdx = 0; rIdx < rowNum; rIdx += 1) {
        // Grab the column number if we don't have it
        if (!colNum) {
            colNum = elements[rIdx].length;
        }
        row = tbl.insertRow(-1);
        for (cIdx = 0; cIdx < colNum; cIdx += 1) {
            // Check how this element should be added
            elem = elements[rIdx][cIdx];
            cell = row.insertCell(-1);
            processCellContents(elem, cell);
        }
    }
    return tbl;
}
exports.createTable = createTable;
/**
 * processCellContents
 * ----------------------------------------------------------------------------
 * Processes data that can be used to populate a table cell
 * @param  {any}                  data The data to populate the cell with
 * @param  {HTMLTableCellElement} cell The cell to populate
 * @return {HTMLTableCellElement}      The cell, newly populated with contents
 */
function processCellContents(data, cell) {
    ;
    let content;
    let key;
    if (!data) {
        return cell;
    }
    // Check if this is a simple string, and if so, set it to be the cell content
    if (typeof data == "string") {
        cell.innerHTML = data;
        // Check if the content is an HTML element, in which case, append it
    }
    else if (data.appendChild) {
        cell.appendChild(data);
        // Check if the content is a custom object, in which case, parse it
    }
    else {
        if (data.create) {
            content = createElement_1.createElement(data.create);
            cell.appendChild(content);
        }
        else {
            cell.innerHTML = data.content;
        }
        // Handle additional properties on our custom element
        for (key in data.attr) {
            if (data.attr.hasOwnProperty(key)) {
                cell.setAttribute(key, data.attr[key]);
            }
        }
    }
    return cell;
}
exports.processCellContents = processCellContents;
;
/**
 * addRow
 * ----------------------------------------------------------------------------
 * Adds a row to an HTML table element
 * @param  {HTMLTableElement} table      The table element to add to
 * @param  {any[]}            [elements] Any elements that should be inccluded as cells in this row
 * @param  {number}           [idx]      The index at which this row should be added
 * @param  {number}           [colNum]   The number of columns that should be added to this row
 * @return {HTMLTableRowElement}       The row that was created
 */
function addRow(table, elements, idx, colNum) {
    ;
    let row;
    let cell;
    let cIdx;
    let data;
    if (!idx && (idx !== 0)) {
        idx = -1;
    }
    if (!colNum && colNum !== 0) {
        colNum = elements.length;
    }
    // Quit if we don't have a table
    if (!table)
        return;
    if (!table.insertRow)
        return;
    row = table.insertRow(idx);
    // Loop through columns to add cells
    for (cIdx = 0; cIdx < colNum; cIdx += 1) {
        cell = row.insertCell(-1);
        data = elements[cIdx] || "";
        processCellContents(data, cell);
    }
    return row;
}
exports.addRow = addRow;
;
