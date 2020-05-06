"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
const toolkip_comparable_1 = require("@kipprice/toolkip-comparable");
function compareLeftPosition(elemA, elemB) {
    return _comparePosition(toolkip_html_helpers_1.globalOffsetLeft(elemA), toolkip_html_helpers_1.globalOffsetLeft(elemB));
}
exports.compareLeftPosition = compareLeftPosition;
function getLeftMost(...elems) {
    return elems.sort(compareLeftPosition)[0];
}
exports.getLeftMost = getLeftMost;
function compareRightPosition(elemA, elemB) {
    return _comparePosition(-1 * (toolkip_html_helpers_1.globalOffsetLeft(elemA) + elemA.offsetWidth), -1 * (toolkip_html_helpers_1.globalOffsetLeft(elemB) + elemB.offsetWidth));
}
exports.compareRightPosition = compareRightPosition;
function getRightMost(...elems) {
    return elems.sort(compareRightPosition)[0];
}
exports.getRightMost = getRightMost;
function compareTopPosition(elemA, elemB) {
    return _comparePosition(toolkip_html_helpers_1.globalOffsetTop(elemA), toolkip_html_helpers_1.globalOffsetTop(elemB));
}
exports.compareTopPosition = compareTopPosition;
function getTopMost(...elems) {
    return elems.sort(compareTopPosition)[0];
}
exports.getTopMost = getTopMost;
function compareBottomPosition(elemA, elemB) {
    return _comparePosition(-1 * (toolkip_html_helpers_1.globalOffsetTop(elemA) + elemA.offsetHeight), -1 * (toolkip_html_helpers_1.globalOffsetTop(elemB) + elemB.offsetHeight));
}
exports.compareBottomPosition = compareBottomPosition;
function getBottomMost(...elems) {
    return elems.sort(compareBottomPosition)[0];
}
exports.getBottomMost = getBottomMost;
function _comparePosition(posA, posB) {
    if (posA < posB) {
        return toolkip_comparable_1.SortOrderEnum.CORRECT_ORDER;
    }
    if (posA > posB) {
        return toolkip_comparable_1.SortOrderEnum.INCORRECT_ORDER;
    }
    return toolkip_comparable_1.SortOrderEnum.SAME;
}
