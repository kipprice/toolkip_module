"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkip_maths_1 = require("@kipprice/toolkip-maths");
const toolkip_create_elements_1 = require("@kipprice/toolkip-create-elements");
const toolkip_html_helpers_1 = require("@kipprice/toolkip-html-helpers");
const toolkip_style_libraries_1 = require("@kipprice/toolkip-style-libraries");
/**
 * arrangeRadially
 * ---------------------------------------------------------------------------
 * Arrange a series of elements around a central element, making sure there is enough room for each element
 *
 * @param 	centralELem 	the element to use as the center point
 * @param 	fringeElems 	the elements to arrange around the central element
 * @param 	minAngle 		the angle at which to start (in degrees)
 * @param 	maxAngle 		the angle at which to stop (in degrees)
 */
function arrangeRadially(centralELem, fringeElems, minAngle, maxAngle) {
    // The calculation for this needs to be as follows:
    //		1. Each element gets an angle assigned
    // 		2. each element has its dimensions determined, then the distance of circle that would be neede to fit all X
    // set defaults for angles
    minAngle = minAngle || 0;
    maxAngle = maxAngle || 360;
    let availableAngle = maxAngle - minAngle;
    let deltaAngle = availableAngle / fringeElems.length;
    let maxDistance = 0;
    let centralPoint = {
        x: centralELem.offsetWidth / 2,
        y: centralELem.offsetHeight / 2
    };
    let elem;
    // First calculate the max distance we need to move elements away
    for (elem of fringeElems) {
        let elemRadius = Math.max(elem.offsetWidth, elem.offsetHeight);
        let centralAngle = availableAngle / fringeElems.length;
        let internalAngle = 180 - centralAngle;
        let appropriateDistance = (elemRadius * Math.sin(toolkip_maths_1.degreesToRadians(internalAngle))) / Math.sin(toolkip_maths_1.degreesToRadians(centralAngle));
        if (appropriateDistance > maxDistance) {
            maxDistance = appropriateDistance;
        }
    }
    // actually position the elements
    let i;
    for (i = 0; i < fringeElems.length; i += 1) {
        let pt = toolkip_maths_1.getEndPoint(centralPoint, minAngle + (deltaAngle * i), maxDistance);
        console.log(pt);
        elem = fringeElems[i];
        elem.style.left = (pt.x - (elem.offsetWidth / 2)) + "px";
        elem.style.top = (pt.y - (elem.offsetHeight / 2)) + "px";
    }
}
exports.arrangeRadially = arrangeRadially;
/**
 * drawLine
 * --------------------------------------------------------------------------
 * Draws a line between two points
 *
 * @param 	start       	The start point of the line
 * @param 	end         	The end point of the line
 * @param 	host        	The element to draw the line on
 * @param 	lbl       		If included, what to label the line
 * @param 	lblNoRotate 	If true, doesn't rotate the text to match the line angle
 *
 * @returns The line that was drawn
 */
function drawLine(start, end, host, lbl, lblNoRotate) {
    ;
    let angle;
    let distance;
    let div;
    let lblElem;
    distance = toolkip_maths_1.getDistance(start, end);
    angle = toolkip_maths_1.getAngle(start, end);
    // Create a CSS class that can be overridden for general options
    const cls = {
        position: "absolute",
        height: "1px",
        transformOrigin: "0px 0px"
    };
    toolkip_style_libraries_1.StyleLibrary.add("trigDrawing", { ".angledLine": cls });
    // Create the div and give it minimal styling to show the line
    div = toolkip_create_elements_1.createSimpleElement("", "angledLine");
    div.style.left = start.x + "px";
    div.style.top = start.y + "px";
    // Approriately assign the size of the element
    div.style.width = distance + "px";
    // Rotate to our specified degree
    div.style.transform = "rotate(" + angle + "deg)";
    // Add to the specified parent element
    if (host) {
        host.appendChild(div);
    }
    // If there is also a label, create that
    if (lbl) {
        lblElem = toolkip_create_elements_1.createSimpleElement("", "lbl", lbl);
        if (lblNoRotate) {
            lblElem.style.transform = "rotate(" + (-1 * angle) + "deg)";
            lblElem.style.transformOrigin = "(0, 0)";
        }
        div.appendChild(lblElem);
    }
    return div;
}
exports.drawLine = drawLine;
;
/**
 * updateLine
 * ---------------------------------------------------------------------------
 * Update an existing line to have a new end-point
 *
 * @param 	line	The line to update
 * @param 	end		The end point to use for the line
 *
 * @returns	The updated line
 */
function updateLine(line, end) {
    let start = {
        x: parseInt(line.style.left),
        y: parseInt(line.style.top)
    };
    let distance = toolkip_maths_1.getDistance(start, end);
    let angle = toolkip_maths_1.getAngle(start, end);
    line.style.width = distance + "px",
        line.style.transform = "rotate(" + angle + "deg)";
    return line;
}
exports.updateLine = updateLine;
/**
 * connectElements
 * --------------------------------------------------------------------------
 * Draws a line between the two provided elements
 *
 * @param 	start_elem 	The element to start the line at
 * @param 	end_elem   	The element to end the line at
 *
 * @return 	The line that gets drawn
 */
function connectElements(start_elem, end_elem, lbl, lblNoRotate) {
    ;
    let start_point;
    let end_point;
    let x_1;
    let x_2;
    let y_1;
    let y_2;
    let parent;
    // Set our parent to use when calculating the global offsets
    parent = toolkip_html_helpers_1.findCommonParent(start_elem, end_elem);
    // Set the values to be the center of each element
    x_1 = toolkip_html_helpers_1.globalOffsetLeft(start_elem, parent) + (start_elem.offsetWidth / 2);
    x_2 = toolkip_html_helpers_1.globalOffsetLeft(end_elem, parent) + (end_elem.offsetWidth / 2);
    y_1 = toolkip_html_helpers_1.globalOffsetTop(start_elem, parent) + (start_elem.offsetHeight / 2);
    y_2 = toolkip_html_helpers_1.globalOffsetTop(end_elem, parent) + (end_elem.offsetHeight / 2);
    // Create the objects for these points
    start_point = { x: x_1, y: y_1 };
    end_point = { x: x_2, y: y_2 };
    return drawLine(start_point, end_point, parent, lbl, lblNoRotate);
}
exports.connectElements = connectElements;
;
